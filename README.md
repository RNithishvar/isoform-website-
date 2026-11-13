# ISOFORM website

React + Tailwind CSS front end, Node.js contact API. Every page is prerendered to static HTML at build time, so it loads fast and search engines get real content.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173. The dev server also serves the contact API.

```bash
npm run build
npm start
```

`build` creates `dist/` (one HTML file per page). `start` serves it with the contact API at http://localhost:3000.

## Settings

Copy `.env.example` to `.env` and fill it in.

| Setting | What it does |
| --- | --- |
| `SITE_URL` | Your live address, for canonical links, the social preview image and `sitemap.xml`. On Vercel the production domain is used automatically. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | The email service that delivers enquiries. Until these are set, the form tells visitors it could not send and shows the email address instead. |
| `CONTACT_TO` | Inbox for enquiries. Defaults to isoformagency@gmail.com. |
| `MAIL_TRANSPORT=log` | Local testing only: prints enquiries in the terminal instead of sending them. |

With Gmail: turn on 2-Step Verification, create an App password, and use `smtp.gmail.com`, port `465`, your Gmail address as `SMTP_USER` and the App password as `SMTP_PASS`.

## Deploy on Vercel

Import the folder as a project. `vercel.json` already sets the build command, clean URLs and security headers, and `api/contact.js` becomes the serverless function. Add the settings above under Project Settings, Environment Variables.

On any other Node host, run `npm run build` then `npm start`.

## Where things are

| Path | Contents |
| --- | --- |
| `src/data/` | All site copy that repeats: services, projects, process steps, FAQs, numbers |
| `src/pages/` | One file per page |
| `src/components/` | Header, footer, hero, intro, form and other shared pieces |
| `src/index.css` | Design tokens (colours, type, easing) and component styles |
| `src/seo.js` | Page titles, descriptions and structured data |
| `server/contact.js` | Enquiry validation, rate limiting and email sending |
| `scripts/prerender.mjs` | Writes the static HTML, `robots.txt` and `sitemap.xml` |

To add a project, put its screenshots in `src/assets/work/` and add an entry in `src/data/projects.js`.

## Privacy

The site sets no cookies, uses no browser storage, loads no third-party scripts or fonts, and stores no enquiries on the server. Keep it that way, or update the privacy policy page.
