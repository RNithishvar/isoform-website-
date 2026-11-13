import PageHeader from '../components/PageHeader.jsx';
import { site } from '../data/site.js';

const mailto = (
  <a href={`mailto:${site.email}`} className="text-link text-white">
    {site.email}
  </a>
);

const sections = [
  {
    title: 'What we collect',
    body: <>Only the details you type into the contact form. This website has no analytics, no trackers and no cookies.</>,
  },
  {
    title: 'How we use it',
    body: <>Only to reply to you.</>,
  },
  {
    title: 'Where it goes',
    body: (
      <>
        Your enquiry goes to our inbox through an email service. The site is hosted on Vercel. Fonts load from this
        site, not from a third party.
      </>
    ),
  },
  {
    title: 'How long we keep it',
    body: <>Only as long as it’s needed.</>,
  },
  {
    title: 'Your choices',
    body: <>Email {mailto} to see, correct or delete your data.</>,
  },
];

export default function Privacy() {
  return (
    <>
      <PageHeader label="Legal" title="Privacy policy" lead="Last updated: October 2026" />

      <div className="wrap pb-24 md:pb-36">
        <div className="max-w-5xl border-b border-line">
          {sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-x-10 gap-y-3 border-t border-line py-9 md:grid-cols-[16rem_1fr] md:py-12"
            >
              <h2 className="type-h3">{section.title}</h2>
              <p className="type-lead max-w-2xl text-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
