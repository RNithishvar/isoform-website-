// All site copy and content lives here so it can be edited in one place.

export const contact = {
  email: "isoformagency@gmail.com",
};

export const navLinks = [
  { label: "Services", to: "/services", id: "services", hasMenu: true },
  { label: "Work", to: "/work", id: "work" },
  { label: "About", to: "/about", id: "about" },
  { label: "Process", to: "/process", id: "process" },
  { label: "Contact", to: "/contact", id: "contact" },
];

export const stats = [
  { value: "4", label: "Websites live right now" },
  { value: "2", label: "Instagram accounts we run" },
  { value: "7,300+", label: "Followers across those accounts" },
  { value: "5", label: "Services under one roof" },
];

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on what you need. After a short call we send a fixed price in writing, so you know the full cost before anything starts.",
  },
  {
    q: "How long will it take?",
    a: "We agree a delivery date in the plan, before you pay. A simple site moves faster than a store with hundreds of products, and you'll know which one you're getting.",
  },
  {
    q: "Can I update my website myself?",
    a: "Yes. Your site comes with a simple admin panel for text, photos and prices. No code, no waiting on us.",
  },
  {
    q: "Do I own my website and accounts?",
    a: "Yes. Your domain, your social accounts and your content belong to you, always.",
  },
  {
    q: "Can I hire you for just one thing?",
    a: "Of course. Pick one service or several. We'll only suggest what will actually help.",
  },
  {
    q: "Do we need to meet in person?",
    a: "No. Calls and messages work for most projects, and we're happy to meet when it helps.",
  },
];

export const services = [
  {
    slug: "websites",
    number: "01",
    name: "Websites & Portfolios",
    short: "Websites",
    headline: "A website that keeps selling while you're busy.",
    body: "Fast, mobile-first sites for shops, studios and service businesses. You get a simple admin panel, so changing a price or a photo never means waiting on us.",
    bullets: [
      "Business sites, portfolios and online stores",
      "Designed for phones first, then desktop",
      "Edit text, photos and prices yourself",
      "Set up for Google search from day one",
    ],
    screen: "website",
    workCategory: ["Websites", "E-commerce"],
    detail: {
      problem:
        "Most customers check you online before they call. If your site is slow, outdated or missing, they quietly pick someone else.",
      forWho: ["Shops and online stores", "Architects, studios and freelancers", "Travel, food and hospitality businesses"],
      includes: [
        { title: "Design around your customers", text: "We plan the pages around what your customers need to see before they buy or book." },
        { title: "Built for speed", text: "Pages load fast on mobile data, because that's where most of your visitors are." },
        { title: "Your own admin panel", text: "Update products, prices, photos and text without touching code." },
        { title: "Enquiries that reach you", text: "Booking forms, WhatsApp buttons and order flows that land straight in your inbox or phone." },
      ],
    },
  },
  {
    slug: "social-media",
    number: "02",
    name: "Social Media Management",
    short: "Social Media",
    headline: "Show up every week without thinking about it.",
    body: "We plan the month, design the posts, write the captions and publish them. You approve once, then get back to running your business.",
    bullets: [
      "A monthly content calendar",
      "Posts, carousels and story designs",
      "Captions written for your customers",
      "Profile setup and a monthly report",
    ],
    screen: "social",
    workCategory: ["Social media"],
    detail: {
      problem:
        "Posting \"when there's time\" means weeks of silence, and an inactive page looks like a closed business. Customers scroll your profile before they message you.",
      forWho: ["Local service businesses", "Artists and creators", "Travel and hospitality brands"],
      includes: [
        { title: "A plan, not random posts", text: "Each month starts with a calendar built around your offers, seasons and what your audience responds to." },
        { title: "Designed to match your brand", text: "Every post and story uses your colours and fonts, so your grid looks like one business." },
        { title: "Captions that sound like you", text: "Written for your customers, with clear calls to book, buy or message." },
        { title: "Know what's working", text: "A short monthly report on reach, followers and enquiries, in plain language." },
      ],
    },
  },
  {
    slug: "video-editing",
    number: "03",
    name: "Video Editing",
    short: "Video Editing",
    headline: "Reels people watch past the first second.",
    body: "Short-form edits for Instagram, YouTube Shorts and ads, cut for pace, with captions and sound that hold attention to the end.",
    bullets: [
      "Reels, Shorts and talking-head edits",
      "Motion graphics and word-by-word captions",
      "Product and ad videos",
      "Edited from the footage you already have",
    ],
    screen: "video",
    workCategory: ["Social media"],
    detail: {
      problem:
        "You've got hours of footage on your phone and no time to edit it. Raw clips get skipped in the first second.",
      forWho: ["Founders who talk to camera", "Product and service brands", "Creators who want a consistent style"],
      includes: [
        { title: "Hooks that stop the scroll", text: "We cut the first two seconds hard, so people stay for the rest." },
        { title: "Captions on every word", text: "Most people watch on mute. Clean, synced captions keep them watching." },
        { title: "Motion and mockups", text: "Simple graphics that show what you're talking about, not just your face." },
        { title: "Ready for every platform", text: "Exported for Reels, Shorts and ads, in the right sizes." },
      ],
    },
  },
  {
    slug: "automation",
    number: "04",
    name: "Automation",
    short: "Automation",
    headline: "Stop answering the same message fifty times.",
    body: "WhatsApp replies, booking confirmations and follow-ups that run on their own, connected to the tools you already use.",
    bullets: [
      "WhatsApp auto-replies and quick menus",
      "Booking and payment confirmations",
      "Leads saved to Google Sheets or your CRM",
      "Follow-ups that go out on time",
    ],
    screen: "automation",
    workCategory: ["Dashboards"],
    detail: {
      problem:
        "The same five questions eat your day, and a slow reply loses the booking. Leads end up scattered across chats and notebooks.",
      forWho: ["Travel and booking businesses", "Clinics, salons and studios", "Anyone drowning in WhatsApp"],
      includes: [
        { title: "Instant answers", text: "Prices, timings and availability answered in seconds, any time of day." },
        { title: "Bookings without back-and-forth", text: "Customers pick, confirm and get a receipt without you typing a word." },
        { title: "Every lead in one place", text: "Enquiries land in a sheet or dashboard you can actually follow up from." },
        { title: "Follow-ups on autopilot", text: "Reminders and thank-you messages go out on schedule." },
      ],
    },
  },
  {
    slug: "graphic-design",
    number: "05",
    name: "Graphic Design",
    short: "Graphic Design",
    headline: "Look like the business you're becoming.",
    body: "Logos, brand kits, posts and print that make you look as good as the work you actually do.",
    bullets: [
      "Logo and visual identity",
      "Brand colours, fonts and simple usage rules",
      "Social media templates",
      "Menus, flyers, banners and business cards",
    ],
    screen: "design",
    workCategory: ["Websites", "Social media"],
    detail: {
      problem:
        "A logo made in a hurry and posts in five different styles make a good business look small.",
      forWho: ["New businesses", "Businesses ready for a refresh", "Anyone printing menus, flyers or banners"],
      includes: [
        { title: "A logo with a reason", text: "Built around what makes you different, and tested at every size." },
        { title: "A brand kit you can reuse", text: "Colours, fonts and examples, so everything you make stays consistent." },
        { title: "Templates for social", text: "Editable post and story templates so your feed stays on-brand." },
        { title: "Print that's ready to print", text: "Files set up properly for your printer, first time." },
      ],
    },
  },
];

export const projects = [
  {
    slug: "eternity",
    name: "Eternity",
    category: "E-commerce",
    description: "An online store for handmade chocolates and spices from Ooty.",
    url: "https://eternitychocolateooty.in",
    domain: "eternitychocolateooty.in",
    desktop: "/work/eternity-desktop.png",
    mobile: "/work/eternity-mobile.png",
    services: ["websites", "graphic-design"],
  },
  {
    slug: "ss-architects",
    name: "SS Architects & Interiors",
    category: "Websites",
    description: "A portfolio site for an architecture studio, with online consultation booking.",
    url: "https://ssachitectandinterior.com",
    domain: "ssachitectandinterior.com",
    desktop: "/work/ssarch-desktop.png",
    mobile: "/work/ssarch-mobile.png",
    services: ["websites"],
  },
  {
    slug: "rashe-holidays",
    name: "Rashe Holidays",
    category: "Dashboards",
    description: "A cab and trip booking site for the Nilgiris, with a dashboard for every reservation and enquiry.",
    url: "https://rasheholidays.com",
    domain: "rasheholidays.com",
    desktop: "/work/rashe-desktop.png",
    mobile: "/work/rashe-mobile.png",
    services: ["websites", "automation"],
  },
  {
    slug: "queens-clozet",
    name: "Queens Clozet",
    category: "Websites",
    description: "An elegant website for a boutique and craft studio.",
    url: "https://queensclozet.in",
    domain: "queensclozet.in",
    desktop: "/work/queens-desktop.png",
    mobile: "/work/queens-mobile.png",
    services: ["websites"],
  },
  {
    slug: "ooty-trip-planner",
    name: "Ooty Trip Planner",
    category: "Social media",
    description: "Instagram content for a travel company in Ooty: packages, cab price lists and reels.",
    url: "https://www.instagram.com/ooty_trip_planner/",
    domain: "@ooty_trip_planner",
    social: "/work/ooty-trip-planner.jpg",
    stat: "4,459 followers",
    services: ["social-media", "video-editing", "graphic-design"],
  },
  {
    slug: "dilshath-mehendhi-art",
    name: "Dilshath Mehendhi Art",
    category: "Social media",
    description: "Instagram content for an Ooty mehendi, makeup and nail artist.",
    url: "https://www.instagram.com/dilshath_mehendhi_art/",
    domain: "@dilshath_mehendhi_art",
    social: "/work/dilshath-mehendhi-art.jpg",
    stat: "2,864 followers",
    services: ["social-media", "video-editing"],
  },
];

export const workFilters = ["All", "Websites", "E-commerce", "Dashboards", "Social media"];

export const reasons = [
  {
    title: "One team, everything connected",
    text: "Your website, posts, videos and automations come from the same people, so they look and sound like one business.",
  },
  {
    title: "Made for you, not from a template",
    text: "We start from your customers and your goals. Nothing is copy-pasted from the last client.",
  },
  {
    title: "You stay in control",
    text: "You own your domain, your accounts and your content, and you can edit your site whenever you like.",
  },
  {
    title: "Clear from day one",
    text: "A fixed scope, a clear price and a delivery date, agreed before any work starts.",
  },
];

export const steps = [
  { number: "01", title: "Talk", text: "A quick call about your business, your customers and what you want to fix." },
  { number: "02", title: "Plan", text: "You get a written scope, a fixed price and a date. No surprises later." },
  { number: "03", title: "Build", text: "We design and build, and you approve each stage before we move on." },
  { number: "04", title: "Launch & grow", text: "We go live, show you how to run it, and stay around for updates." },
];
