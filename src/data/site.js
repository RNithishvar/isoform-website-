/* global __BUILD_YEAR__ */

export const site = {
  name: 'ISOFORM',
  tagline: 'Digital • Design • Experience',
  description: 'A digital design studio for websites, social media, video, automation and branding.',
  email: 'isoformagency@gmail.com',
  // set at build time, so the server-rendered and client-rendered year always match
  year: typeof __BUILD_YEAR__ === 'undefined' ? 2026 : __BUILD_YEAR__,
};

export const studioLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/process', label: 'Process' },
  { to: '/contact', label: 'Contact' },
];

// header links after the Services drop-down
export const navLinks = studioLinks.filter((link) => !['/', '/services'].includes(link.to));
