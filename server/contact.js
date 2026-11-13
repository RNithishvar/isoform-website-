// Contact enquiry handler. One implementation, three callers:
//   - the Vite dev server      (vite.config.js)
//   - the Express server       (server/index.js, `npm start`)
//   - the Vercel function      (api/contact.js)
//
// Nothing is stored. A valid enquiry is emailed to the studio inbox through
// the SMTP service configured in the environment (see .env.example).

import crypto from 'node:crypto';
import { createTransport } from 'nodemailer';
import { isEmail, normalizeEnquiry, validateEnquiry } from '../src/lib/contactSchema.js';

const DEFAULT_TO = 'isoformagency@gmail.com';
const MAX_BODY_BYTES = 20_000;

/* ----------------------------- rate limiting ----------------------------- */
// In-memory, per process. Addresses are salted and hashed, never kept raw.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const salt = crypto.randomBytes(16);
const hits = new Map();

function retryAfterSeconds(ip) {
  const key = crypto.createHash('sha256').update(salt).update(String(ip || 'unknown')).digest('base64');
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 2000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(k);
    }
  }
  return 0;
}

/* -------------------------------- mailing -------------------------------- */
let cached;

function getTransport() {
  if (cached !== undefined) return cached;
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_TRANSPORT, NODE_ENV, VERCEL } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT) || 465;
    cached = {
      kind: 'smtp',
      transport: createTransport({
        host: SMTP_HOST,
        port,
        secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      }),
    };
  } else if (MAIL_TRANSPORT === 'log' && NODE_ENV !== 'production' && !VERCEL) {
    // Local testing only: the message is printed to the terminal, not sent.
    cached = { kind: 'log', transport: createTransport({ jsonTransport: true }) };
  } else {
    cached = null;
  }
  return cached;
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

function composeMail(enquiry) {
  const rows = [
    ['Name', enquiry.name],
    ['Email or phone', enquiry.contact],
    ['Business', enquiry.business || 'Not given'],
    ['Needs help with', enquiry.services.join(', ')],
  ];
  const text = `${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\n${enquiry.message}\n`;
  const html =
    `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="color:#666;vertical-align:top">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`
      )
      .join('') +
    `</table><p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>`;

  const from = process.env.MAIL_FROM || process.env.SMTP_USER || DEFAULT_TO;
  return {
    from: { name: 'ISOFORM website', address: from },
    to: process.env.CONTACT_TO || DEFAULT_TO,
    replyTo: isEmail(enquiry.contact) ? enquiry.contact : undefined,
    subject: `New enquiry from ${enquiry.name} (${enquiry.services.join(', ')})`,
    text,
    html,
  };
}

/* ------------------------------ core handler ----------------------------- */
// Returns { status, body, headers? }. Never throws.
export async function handleContact({ body, ip }) {
  const input = body && typeof body === 'object' ? body : {};

  // Honeypot: a field people never see. If it has a value, don't deliver, and
  // say so plainly, so a real person caught by mistake still knows to email us.
  if (typeof input.company_url === 'string' && input.company_url.trim() !== '') {
    return { status: 400, body: { ok: false, error: 'rejected' } };
  }

  const enquiry = normalizeEnquiry(input);
  const fields = validateEnquiry(enquiry);
  if (Object.keys(fields).length > 0) {
    return { status: 422, body: { ok: false, error: 'validation', fields } };
  }

  const wait = retryAfterSeconds(ip);
  if (wait > 0) {
    return { status: 429, body: { ok: false, error: 'rate_limited' }, headers: { 'Retry-After': String(wait) } };
  }

  const mailer = getTransport();
  if (!mailer) {
    console.error('[contact] No mail service configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS (see .env.example).');
    return { status: 503, body: { ok: false, error: 'not_configured' } };
  }

  try {
    const info = await mailer.transport.sendMail(composeMail(enquiry));
    if (mailer.kind === 'log') {
      console.log('[contact] MAIL_TRANSPORT=log, message not sent:\n' + JSON.stringify(JSON.parse(info.message), null, 2));
    }
    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error('[contact] Sending failed:', error?.code || error?.message || error);
    return { status: 502, body: { ok: false, error: 'send_failed' } };
  }
}

/* --------------------------- raw request adapter -------------------------- */
function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let tooLarge = false;
    const chunks = [];
    req.on('data', (chunk) => {
      if (tooLarge) return; // keep draining, keep nothing
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        tooLarge = true;
        chunks.length = 0;
        reject(Object.assign(new Error('Payload too large'), { status: 413 }));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
      } catch {
        reject(Object.assign(new Error('Invalid JSON'), { status: 400 }));
      }
    });
    req.on('error', reject);
  });
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // non-browser clients and same-origin GETs don't send it
  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Works with plain Node, Connect, Express and Vercel request/response objects.
export async function contactRequest(req, res, { ip } = {}) {
  const send = (status, body, headers = {}) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
    res.end(JSON.stringify(body));
  };

  if (req.method !== 'POST') {
    return send(405, { ok: false, error: 'method_not_allowed' }, { Allow: 'POST' });
  }
  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return send(415, { ok: false, error: 'unsupported_media_type' });
  }
  if (!sameOrigin(req)) {
    return send(403, { ok: false, error: 'forbidden' });
  }

  let body;
  try {
    // Vercel and express.json() provide a parsed body; otherwise read the stream.
    body = req.body && typeof req.body === 'object' ? req.body : await readJson(req);
  } catch (error) {
    if (error.status === 413) {
      // answer, then drop the connection instead of reading the rest of the upload
      res.once('finish', () => req.destroy());
      return send(413, { ok: false, error: 'payload_too_large' }, { Connection: 'close' });
    }
    return send(error.status || 400, { ok: false, error: 'bad_request' });
  }

  const result = await handleContact({ body, ip: ip || req.socket?.remoteAddress });
  return send(result.status, result.body, result.headers);
}
