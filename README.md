# Isoform website

Portfolio site for Isoform — Digital · Design · Experience.

Built with React, Vite, Tailwind CSS v4, Motion and Lenis.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build
```

builds the site into `dist/`.

## Where things live

- `src/data/site.js`: all the text: services, projects, steps, FAQs and the contact email
- `src/components/Experience.jsx`: the home page scroll scene (device zoom, phone in hand, rotating phone)
- `src/components/PhoneScreens.jsx`: the screens shown on the 3D phone
- `src/pages/`: Home, Services, Service detail, Work, About, Process, Contact
- `public/work/`: client screenshots used in the Work section

## Pages

`/`, `/services`, `/services/:slug`, `/work`, `/about`, `/process`, `/contact`

When deploying, point every route to `index.html` (single-page app).
