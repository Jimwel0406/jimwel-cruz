export const SITE = {
  url: "https://jimwel-cruz.vercel.app",
  name: "Jimwel Cruz",
  role: "Full-Stack Web Developer",
  title: "Jimwel Cruz — Full-Stack Web Developer",
  description:
    "Full-stack developer in the Philippines building fast, accessible web apps and e-commerce stores with React, Next.js, Node.js, PHP, and Shopify.",
  email: "jimwelscruz0406@gmail.com",
  github: "https://github.com/Jimwel0406",
  facebook: "https://www.facebook.com/jimwel.saraminez.cruz",
  image: "/assets/me.jpg",
  ogImage: "/og-image.png",
  locale: "en_US",
} as const;

export const PERSON_DESCRIPTION =
  "Full-stack developer based in the Philippines, building production web applications and e-commerce stores with React, Next.js, Node.js, PHP, and Shopify since 2023.";

export const KNOWS_ABOUT = [
  "Full-stack development",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "PHP",
  "Shopify",
  "Liquid",
  "Tailwind CSS",
  "Supabase",
  "Prisma",
  "Stripe",
  "NextAuth",
  "Three.js",
  "E-commerce development",
  "Web performance",
  "Web accessibility",
  "Technical SEO",
  "Answer Engine Optimization",
  "Generative Engine Optimization",
];

export const SERVICES = [
  {
    name: "Full-Stack Development",
    description:
      "Production-ready web applications from database to interface: schema design, APIs, authentication, and responsive React front ends.",
  },
  {
    name: "E-commerce Development",
    description:
      "Shopify and custom storefronts with product catalog architecture, cart and checkout flows, payment integration, and performance tuning.",
  },
  {
    name: "UI Implementation",
    description:
      "Pixel-accurate, responsive interfaces built from design files, with reusable component systems that hold up at every breakpoint.",
  },
  {
    name: "Performance Optimization",
    description:
      "Core Web Vitals tuning through code splitting, image optimization, caching, and bundle analysis for faster load times.",
  },
  {
    name: "Accessibility Audits",
    description:
      "WCAG-oriented reviews of keyboard navigation, screen-reader support, contrast, and focus management, with fixes implemented.",
  },
  {
    name: "Responsive Design",
    description:
      "Mobile-first layouts that preserve content and interaction quality from 320px phones to 4K monitors.",
  },
];

export const absolute = (path: string) => new URL(path, SITE.url).toString();

export const siteGraph: Record<string, unknown>[] = [
  {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: "Jimwel Cruz Portfolio",
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE.url}/#person` },
  },
  {
    "@type": "ProfilePage",
    "@id": `${SITE.url}/#webpage`,
    url: `${SITE.url}/`,
    name: SITE.title,
    description: SITE.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#person` },
    mainEntity: { "@id": `${SITE.url}/#person` },
  },
  {
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.name,
    givenName: "Jimwel",
    familyName: "Cruz",
    url: SITE.url,
    image: {
      "@type": "ImageObject",
      url: absolute(SITE.image),
      width: 1254,
      height: 1254,
    },
    jobTitle: SITE.role,
    description: PERSON_DESCRIPTION,
    email: `mailto:${SITE.email}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    nationality: { "@type": "Country", name: "Philippines" },
    sameAs: [SITE.github, SITE.facebook],
    knowsAbout: KNOWS_ABOUT,
    hasOccupation: {
      "@type": "Occupation",
      name: SITE.role,
      occupationLocation: { "@type": "Country", name: "Philippines" },
      skills: KNOWS_ABOUT.join(", "),
    },
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: { "@id": `${SITE.url}/#person` },
        areaServed: { "@type": "Place", name: "Worldwide" },
      },
    })),
  },
];
