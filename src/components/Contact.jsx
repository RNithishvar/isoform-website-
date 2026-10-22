import { useState } from "react";
import { Check } from "lucide-react";
import { ArrowIcon } from "./ArrowButton.jsx";
import { contact, services } from "../data/site.js";

const options = [...services.map((s) => s.short), "Not sure yet"];

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-coal">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-[14px] bg-white px-4 py-3.5 text-[16px] text-coal placeholder:text-ash outline-1 -outline-offset-1 outline-fog transition-[outline-color] focus:outline-2 focus:outline-brand";

/*
  No backend yet: the form writes a ready-to-send email in the visitor's mail app.
  Swap `onSubmit` for an API call when a form service is set up.
*/
export default function ContactForm() {
  const [picked, setPicked] = useState([]);
  const [sent, setSent] = useState(false);

  const toggle = (o) => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const reach = String(data.get("reach") || "").trim();
    const business = String(data.get("business") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `New project enquiry${name ? ` from ${name}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Phone / email: ${reach}`,
      business && `Business: ${business}`,
      `Interested in: ${picked.length ? picked.join(", ") : "Not specified"}`,
      "",
      message,
    ]
      .filter((l) => l !== false)
      .join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-[28px] bg-cloud p-5 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required autoComplete="name" placeholder="Priya" className={inputClass} />
        </Field>
        <Field label="Phone or email">
          <input name="reach" required autoComplete="email" placeholder="Where can we reach you?" className={inputClass} />
        </Field>
      </div>
      <Field label="Business name (optional)">
        <input name="business" autoComplete="organization" placeholder="What's your business called?" className={inputClass} />
      </Field>
      <fieldset>
        <legend className="mb-3 text-[14px] font-medium text-coal">What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((o) => {
            const on = picked.includes(o);
            return (
              <button
                key={o}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(o)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                  on ? "bg-coal text-white" : "bg-white text-slate outline-1 -outline-offset-1 outline-fog hover:text-coal hover:outline-coal/30"
                }`}
              >
                {on && <Check size={14} strokeWidth={3} />}
                {o}
              </button>
            );
          })}
        </div>
      </fieldset>
      <Field label="Tell us a bit more">
        <textarea
          name="message"
          rows={4}
          placeholder="What do you sell, who are your customers, and what would you like to fix first?"
          className={`${inputClass} resize-none`}
        />
      </Field>
      <button
        type="submit"
        className="group mt-1 inline-flex w-full cursor-pointer items-center justify-between gap-3 rounded-full bg-brand py-1.5 pr-1.5 pl-7 text-[16px] leading-[1.5] font-semibold text-white shadow-[0_10px_36px_-12px_rgba(91,37,225,0.9)] transition-[transform,background-color] duration-300 ease-out-expo hover:scale-[1.01] hover:bg-brand-bright active:scale-[0.99]"
      >
        Send enquiry
        <ArrowIcon size={40} className="bg-white text-brand" />
      </button>
      <p aria-live="polite" className="text-center text-[13px] text-ash">
        {sent ? "Your email app should open with everything filled in. Just hit send." : "This opens your email app with your answers filled in."}
      </p>
    </form>
  );
}
