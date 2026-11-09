import Container from "@/components/Container";
import ContactSection from "@/components/ContactSection";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Code2,
  Eye,
  Frame,
  Gauge,
  MonitorSmartphone,
  ShoppingCart,
} from "lucide-react";
import { SITE } from "@/lib/seo";

const projects = [
  {
    title: "Marrow",
    description:
      "A streetwear label in ink and ivory. Oversized editorial type, film-grain photography, and a seven-section flow that reads like a lookbook.",
    video: "/assets/projects/marrow.mp4",
    image: "/assets/projects/marrow.webp",
    href: "https://marrow-silk.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "UI Design"],
  },
  {
    title: "FoxHound Bee",
    description:
      "A honey brand in warm cream and ember. A hexagonal comb grid, hand-drawn icons, and a single orange accent used sparingly.",
    video: "/assets/projects/foxhoundbee.mp4",
    image: "/assets/projects/foxhoundbee.webp",
    href: "https://foxhound-bee.vercel.app/",
    tags: ["Next.js", "React", "CSS", "UI Design"],
  },
  {
    title: "crumb.",
    description:
      "A cupcake shop in cream and dough. Hand-drawn ink outlines, scalloped section seams, and a real-time 3D hero.",
    video: "/assets/projects/crumb.mp4",
    image: "/assets/projects/crumb.webp",
    href: "https://crumb-drab.vercel.app/",
    tags: ["Next.js", "Three.js", "React Three Fiber", "UI Design"],
  },
  // Hidden for now — restore by removing the comment markers
  // {
  //   title: "Burger Shop",
  //   description:
  //     "A smash-burger restaurant in dark, high contrast. Condensed display type, torn-paper details, and full-bleed food photography.",
  //   video: "/assets/projects/burgershop.mp4",
  //   href: "https://burger-shop-xi.vercel.app/",
  //   tags: ["Next.js", "Tailwind CSS", "TypeScript", "UI Design"],
  // },
  {
    title: "Vellora",
    description:
      "Multi-vendor marketplace for thoughtfully made products. Full-stack build with Next.js, Stripe, real-time notifications, and role-based dashboards.",
    image: "/assets/projects/vellora.webp",
    video: "/assets/projects/vellora.mp4",
    href: "https://vellora-seven.vercel.app/",
    tags: ["Next.js", "Prisma", "Supabase", "Stripe", "NextAuth"],
    priority: true,
  },
  {
    title: "ModernHaven",
    description:
      "E-commerce store for modern furniture. Full-stack build with Next.js, Stripe payments, and real-time inventory management.",
    image: "/assets/projects/modernhaven.webp",
    video: "/assets/projects/modernhaven.mp4",
    href: "https://modern-haven-nine.vercel.app/",
    tags: ["Next.js", "Shopify", "Tailwind CSS", "AI"],
    priority: true,
  },
  {
    title: "ContactFlow",
    description:
      "CRM platform for managing customer interactions. Dashboard with role-based access, analytics, and responsive data visualization.",
    image: "/assets/projects/contactflow.webp",
    video: "/assets/projects/contactflow.mp4",
    href: "https://contactflow-crm.vercel.app/",
    tags: ["Next.js", "Prisma", "Stripe", "NextAuth"],
  },
  // Hidden for now — restore by removing the comment markers
  // {
  //   title: "Quizipedia",
  //   description:
  //     "Interactive trivia and quiz game. Real-time scoring, category filters, and a clean responsive interface.",
  //   image: "/assets/projects/quizipedia.webp",
  //   href: "https://quizipedia.epizy.com/",
  //   tags: ["PHP", "JavaScript", "CSS"],
  // },
  // Hidden for now — restore by removing the comment markers
  // {
  //   title: "Whack-A-Mole",
  //   description:
  //     "Classic arcade-style whack-a-mole game. Vanilla HTML/CSS/JS with score tracking and responsive controls.",
  //   image: "/assets/projects/whackamole.webp",
  //   href: "/projects/mole-bash",
  //   tags: ["HTML", "CSS", "JavaScript"],
  // },
  // {
  //   title: "Calculator",
  //   description:
  //     "Modern and responsive calculator app. Clean UI with keyboard support and arithmetic operations.",
  //   image: "/assets/projects/calculator.webp",
  //   href: "/projects/calculator",
  //   tags: ["HTML", "CSS", "JavaScript"],
  // },
  // {
  //   title: "Block Puzzle",
  //   description:
  //     "Relaxing block puzzle game. Canvas-based logic with smooth animations and mobile-first controls.",
  //   image: "/assets/projects/blockpuzzle.webp",
  //   href: "https://block-puzzle-board.vercel.app/",
  //   tags: ["React", "JavaScript", "Game Dev"],
  // },
];

const skillGroups = [
  {
    title: "Frontend",
    items: [
      "HTML",
      "CSS / Tailwind",
      "JavaScript / TypeScript",
      "React / Next.js",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "PHP",
      "Supabase",
      "REST APIs",
      "Shopify / Liquid",
      "ReCharge (Product Subscription)",
      "Klaviyo (Email Marketing)",
      "External App Integration",
    ],
  },
  {
    title: "Tools",
    items: [
      "Git / GitHub",
      "Vercel",
      "Performance Optimization",
      "Responsive Design",
      "AI Agent Tools (Claude, OpenCode)",
      "Google Apps Script",
    ],
  },
  {
    title: "SEO",
    items: [
      { label: "SEO", note: "Search Engine Optimization — actual search results." },
      { label: "AEO", note: "Answer Engine Optimization — getting featured in AI answers." },
      { label: "GEO", note: "Generative Engine Optimization — being cited by AI engines." },
      "On-Page SEO / Semantic Markup",
      "Structured Data (Schema.org / JSON-LD)",
      "Metadata & Open Graph",
      "Core Web Vitals Optimization",
      "Google Search Console",
      "Bing Webmaster Tools",
      "Ahrefs Webmaster Tools",
    ],
  },
];

const services = [
  {
    service: "Full-Stack Development",
    description:
      "Building complete, production-ready web applications from database to user interface.",
    icon: Code2,
  },
  {
    service: "E-commerce Development",
    description:
      "Creating Shopify and custom online stores that convert visitors into customers.",
    icon: ShoppingCart,
  },
  {
    service: "UI Implementation",
    description:
      "Turning designs into pixel-perfect, responsive interfaces using modern frameworks.",
    icon: Frame,
  },
  {
    service: "Performance Optimization",
    description:
      "Improving load times and Lighthouse scores for a faster, smoother experience.",
    icon: Gauge,
  },
  {
    service: "Accessibility Audits",
    description:
      "Reviewing and fixing usability so everyone can navigate and use your website.",
    icon: Eye,
  },
  {
    service: "Responsive Design",
    description:
      "Designing websites that look and perform equally well on all devices and screen sizes.",
    icon: MonitorSmartphone,
  },
];

const getFaqs = (years: number) => [
  {
    question: "What kind of work do you do?",
    answer:
      "Full-stack development, e-commerce development, UI implementation, performance optimization, accessibility audits, and responsive design — from React and Next.js front-ends to Node.js, PHP, and Shopify back-ends.",
  },
  {
    question: "Are you free for freelance work?",
    answer:
      "Yes. I'm currently available for freelance work and open to discussing new opportunities.",
    // short enough to sit on one line on wide desktops
    oneLine: true,
  },
  {
    question: "How long have you been at this?",
    answer: `Over ${years} years as a full-stack developer.`,
  },
];

const START_YEAR = 2023;

// Work timeline: the role and the diploma, shown on the ledger spine.
const timeline = [
  {
    when: "Sport Formula · 2023 — Present",
    badge: "Current",
    title: "Full Stack Web Developer",
    items: ["Frontend", "Backend", "Tools", "SEO"],
  },
  {
    when: "",
    badge: "Diploma",
    title: "Diploma in Information Technology",
    items: [] as string[],
  },
];

const skillLabel = (item: (typeof skillGroups)[number]["items"][number]) =>
  typeof item === "string" ? item : item.label;

export default function Home() {
  const yearsExperience = new Date().getFullYear() - START_YEAR;
  const faqs = getFaqs(yearsExperience);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                a.boundingClientRect.top - b.boundingClientRect.top
            );

          visible.forEach((entry, idx) => {
            (entry.target as HTMLElement).style.transitionDelay = `${
              Math.min(idx, 5) * 0.08
            }s`;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      els.forEach((el) => observer.observe(el));
    } else {
      els.forEach((el) => el.classList.add("is-visible"));
    }
  }, []);

  // lazy-play videos when they enter viewport
  useEffect(() => {
    const videos = document.querySelectorAll("video[preload='none']");
    if (!("IntersectionObserver" in window)) {
      videos.forEach((v) => {
        void (v as HTMLVideoElement).play();
      });
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void video.play();
            observer.unobserve(video);
          }
        });
      },
      { threshold: 0.25 }
    );
    videos.forEach((v) => observer.observe(v));
  }, []);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "FAQPage",
                  "@id": `${SITE.url}/#faq`,
                  url: `${SITE.url}/#faq`,
                  inLanguage: "en",
                  mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })),
                },
                {
                  "@type": "ItemList",
                  "@id": `${SITE.url}/#work`,
                  name: "Selected work",
                  numberOfItems: projects.length,
                  itemListOrder: "https://schema.org/ItemListOrderAscending",
                  itemListElement: projects.map((project, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@type": "CreativeWork",
                      name: project.title,
                      description: project.description,
                      url: project.href,
                      keywords: project.tags.join(", "),
                      creator: { "@id": `${SITE.url}/#person` },
                      inLanguage: "en",
                    },
                  })),
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </Head>

      <Container>
        {/* ============================================
            HERO
        ============================================ */}
        <section
          id="home"
          className="relative flex flex-col justify-center bg-background px-6 pb-[96px] pt-[120px] md:px-12 md:pb-[140px] md:pt-[160px]"
        >
          {/* Headline on the left, tall portrait on the right inside a hairline frame */}
          <div className="mx-auto grid w-full max-w-[84rem] grid-cols-1 gap-14 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-center md:gap-20">
            <div>
              <h1
                data-reveal
                className="font-display text-[42px] font-medium leading-[1.1] tracking-[-0.03em] text-foreground md:text-[clamp(2.5rem,calc(7.5vw_-_16px),5.75rem)] md:leading-[1.04]"
              >
                I&apos;m Jimwel,
                <br />
                and I build
                <br />
                <span className="font-playfair italic">web applications.</span>
              </h1>

              <p
                data-reveal
                className="mt-8 max-w-[44ch] font-body text-[18px] leading-[1.6] text-foreground/80 md:text-[20px]"
              >
                A full stack web developer based in the Philippines — building fast, accessible
                websites and web apps with Shopify, Next.js and Node.js.
              </p>
            </div>

            <div data-reveal className="relative w-full md:max-w-[440px] md:justify-self-end">
              <div className="relative z-[1] aspect-[3/4] overflow-hidden rounded-[4px] bg-card">
                <Image
                  src="/assets/me.jpg"
                  alt="Jimwel Cruz"
                  fill
                  sizes="(min-width: 768px) 440px, 100vw"
                  quality={90}
                  priority
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="select-none object-cover"
                />
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -left-6 right-6 top-6 hidden rounded-[4px] border border-foreground/25 md:block"
              />
            </div>
          </div>
        </section>

        {/* ============================================
            ABOUT
        ============================================ */}
        <section id="about" className="relative overflow-hidden bg-white text-black">
          {/* Experience — title and counters, then a ledger timeline and skill rows */}
          <div
            data-nav-theme="dark"
            className="relative overflow-hidden bg-background text-foreground"
          >
            <div className="container relative mx-auto max-w-6xl px-6 pb-[86px] pt-20 md:px-12 md:pb-[140px]">
              <div
                data-reveal
                className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
              >
                <h2 className="font-display text-[36px] font-semibold leading-[1.3] tracking-[-0.02em] md:text-[56px]">
                  Work experience
                </h2>

                <div className="flex shrink-0 gap-10 sm:gap-16">
                  <div>
                    <h3 className="font-display text-[30px] font-semibold leading-[1.3] md:text-[42px]">
                      {yearsExperience.toString().padStart(2, "0")}
                    </h3>
                    <div className="font-body text-[16px] leading-[1.4] text-foreground/80 md:text-[18px]">
                      Years experience
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-[30px] font-semibold leading-[1.3] md:text-[42px]">
                      {projects.length.toString().padStart(2, "0")}
                    </h3>
                    <div className="font-body text-[16px] leading-[1.4] text-foreground/80 md:text-[18px]">
                      Projects shipped
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline: a hairline spine draws down as the entries arrive */}
              <ol data-reveal className="ledger-spine mt-20 md:mt-28">
                {timeline.map((entry) => (
                  <li key={entry.title} data-reveal className="ledger-entry relative pb-16 last:pb-0 md:pb-20">
                    {entry.when ? (
                      <p className="font-body text-[16px] leading-[1.4] text-foreground/80">
                        {entry.when}
                      </p>
                    ) : null}
                    <span className="mt-3 inline-block rounded-[10px] border border-foreground/25 px-[10px] py-[4px] font-body text-[16px] leading-[1.2] text-foreground/80">
                      {entry.badge}
                    </span>
                    <h4 className="mt-4 font-display text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] md:text-[44px]">
                      {entry.title}
                    </h4>
                    {entry.items.length > 0 ? (
                      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-body text-[18px] leading-[1.4]">
                        {entry.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ol>

              {/* Skill groups as a ruled table */}
              <div data-reveal className="mt-14 border-t border-foreground/25 md:mt-20">
                {skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="grid gap-2 border-b border-foreground/25 py-6 md:grid-cols-[240px_1fr] md:gap-8"
                  >
                    <h4 className="font-display text-[22px] font-medium leading-[1.3]">
                      {group.title}
                    </h4>
                    <p className="font-body text-[18px] leading-[1.5]">
                      {group.items.map(skillLabel).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* ============================================
            WORK
        ============================================ */}
        <section
          id="work"
          data-nav-theme="dark"
          className="relative overflow-x-clip bg-background pt-24 pb-4 md:pt-32 md:pb-8"
        >
          {/* Stacked cards: each project sticks at the top, and the next slides over it */}
          <div className="mx-auto w-full max-w-[84rem] px-6 md:px-12">
            <h2
              data-reveal
              className="font-display text-[44px] uppercase leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[54px] xl:text-[80px]"
            >
              Some of my recent work
            </h2>

            <div className="mt-14 md:mt-20">
              {projects.map((project, i) => {
                const media =
                  "video" in project && project.video ? (
                    <video
                      src={project.video}
                      poster={
                        "image" in project && project.image
                          ? project.image
                          : undefined
                      }
                      loop
                      muted
                      playsInline
                      preload="none"
                      title={`${project.title} — ${project.description}`}
                      className="absolute inset-0 h-full w-full object-contain object-top md:object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : "image" in project && project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.description}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 75vw"
                      priority={project.priority === true}
                      className="object-contain object-top md:object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : null;

                return (
                  <Link
                    key={project.title}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} — open the live site`}
                    style={{ top: `calc(96px + ${i} * 18px)` }}
                    className="group sticky mx-auto mb-7 block h-[min(74vh,620px)] max-w-[75rem] overflow-hidden rounded-[20px] bg-card shadow-[0_-24px_48px_rgba(0,0,0,0.55)]"
                  >
                    {media}
                    <span
                      className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:right-8 md:top-8"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-6 w-6" />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 grid gap-3 bg-gradient-to-t from-black/90 to-transparent p-6 md:gap-4 md:p-10">
                      <h3 className="font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-none tracking-[-0.02em] text-foreground">
                        {project.title}
                      </h3>
                      <p className="max-w-[56ch] font-body text-[16px] leading-[1.55] text-foreground">
                        {project.description}
                      </p>
                      <span className="font-body text-[16px] text-foreground/80">
                        {project.tags.join(" · ")}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================
            SERVICES
        ============================================ */}
        {/* [ARCHIVED] SERVICES SECTION
        <section className="bg-background px-6 py-32 md:px-12">
          <div className="container mx-auto">
            <p
              data-reveal
              className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-foreground"
            >
              04 / Services
            </p>
            <h2
              data-reveal
              className="mb-16 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            >
              What I
              <br />
              Can Do
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  data-reveal
                  key={service.service}
                  className="group border border-border p-8 transition-colors hover:border-accent/30"
                >
                  <service.icon className="mb-5 text-accent transition-transform group-hover:scale-110" size={20} />
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    {service.service}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* ============================================
            FAQ
        ============================================ */}
        <section
          id="faq"
          data-nav-theme="dark"
          className="relative overflow-hidden bg-background pt-24 pb-24 md:pt-32 md:pb-32"
        >
          <div className="mx-auto w-full max-w-[84rem] px-6 md:px-12">
            <h2
              data-reveal
              className="font-display text-[34px] uppercase leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[44px] md:text-[clamp(2.25rem,4.4vw,4rem)]"
            >
              Questions? I&apos;ve got answers.
            </h2>

            {/* Ruled index — hairline rows; open a row to read its answer, and its dot fills */}
            <ul className="mt-14 border-t border-foreground/25 md:mt-20">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <li
                    key={faq.question}
                    data-reveal
                    style={{ transitionDelay: `${i * 0.08}s` }}
                    className="border-b border-foreground/25"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-8 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground md:py-10"
                    >
                      <span className="font-display text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.15] tracking-[-0.01em] text-foreground">
                        {faq.question}
                      </span>
                      <span
                        className={`h-3.5 w-3.5 shrink-0 rounded-full border border-foreground transition-colors duration-300 ${
                          isOpen ? "bg-foreground" : "bg-transparent"
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={`faq-panel-${i}`}
                      className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`max-w-[60ch] pb-8 font-body text-[16px] leading-[1.6] text-foreground/80 md:pb-10 md:text-[18px] ${
                            faq.oneLine ? "xl:max-w-none xl:whitespace-nowrap" : ""
                          }`}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ============================================
            CONTACT
        ============================================ */}
        <ContactSection />
      </Container>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setModalImage(null)}
        >
          <button
            type="button"
            onClick={() => setModalImage(null)}
            className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <Image
            src={modalImage}
            alt="Full size"
            width={1200}
            height={800}
            className="max-h-[85vh] w-auto object-contain"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
