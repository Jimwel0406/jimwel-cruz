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
    title: "ContactFlow",
    description:
      "CRM platform for managing customer interactions. Dashboard with role-based access, analytics, and responsive data visualization.",
    image: "/assets/projects/contactflow.webp",
    video: "/assets/projects/contactflow.mp4",
    href: "https://contactflow-crm.vercel.app/",
    tags: ["Next.js", "Prisma", "Stripe", "NextAuth"],
  },
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

// Showcase placement on the 12-column grid: wide, narrow, wide on the right,
// narrow on the left. Narrow photos start lower so the page does not read as a grid.
const showcaseSlots = [
  { cell: "lg:col-start-1 lg:col-span-7", ratio: "aspect-[16/10]" },
  { cell: "lg:col-start-8 lg:col-span-5 lg:mt-32", ratio: "aspect-[16/10]" },
  { cell: "lg:col-start-1 lg:col-span-5", ratio: "aspect-[16/10]" },
  { cell: "lg:col-start-6 lg:col-span-7 lg:mt-32", ratio: "aspect-[16/10]" },
];

// keeps hyphenated terms on one line so the hyphen never leaves a stub at a line end
const keepTerm = (text: string) =>
  text.split(/(e-commerce|front-ends|back-ends)/i).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  );

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
  },
  {
    when: "",
    badge: "Education",
    title: "Diploma in Information Technology",
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

  // play videos only while they are in view: start from the first frame each
  // time they arrive, and pause when they scroll away
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
            video.currentTime = 0;
            void video.play();
          } else {
            video.pause();
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
          className="relative flex flex-col justify-center overflow-hidden bg-background px-6 pb-[120px] pt-[120px] md:px-12 md:pb-[160px] md:pt-[160px] lg:pb-[180px] lg:pt-[130px]"
        >
          {/* Giant headline over the portrait: on large screens the two lines of the
              headline are placed over the photo, the tools sit top left */}
          <div className="relative isolate mx-auto grid w-full max-w-[84rem] grid-cols-1 gap-14 md:grid-cols-[auto_minmax(0,440px)] md:items-center md:justify-center md:gap-12 lg:block lg:min-h-[min(72vh,660px)]">
            <div className="relative z-[1] lg:contents">
              {/* Soft glow around the copy only, moving slowly behind the text */}
              <span
                aria-hidden="true"
                className="hero-glow-drift pointer-events-none absolute left-[-12%] right-[-6%] top-[-15%] bottom-[-15%] z-[-1] rounded-full bg-[radial-gradient(ellipse,rgba(240,240,240,0.18)_0%,rgba(240,240,240,0.06)_45%,transparent_72%)] blur-[6px]"
              />
              <h1
                data-reveal
                className="font-display text-[clamp(2rem,10.4vw,2.625rem)] font-medium leading-[1.1] tracking-[-0.03em] text-foreground md:text-[clamp(2.5rem,calc(7.5vw_-_16px),5.75rem)] md:leading-[1.04] lg:pointer-events-none lg:absolute lg:inset-0 lg:!transform-none lg:!opacity-100 lg:text-[inherit]"
              >
                <span className="hero-line lg:absolute lg:z-20 lg:mix-blend-difference lg:left-[50%] lg:top-[calc(12vh-0.55em)] lg:block lg:whitespace-nowrap lg:text-[clamp(3.5rem,8.2vw,7.5rem)] lg:leading-none">
                  I&apos;m Jimwel,
                </span>
                <br className="lg:hidden" />
                <span className="hero-line hero-line-2 lg:absolute lg:z-20 lg:bottom-0 lg:left-0 lg:block lg:whitespace-nowrap lg:text-[clamp(3rem,6.8vw,7.5rem)] lg:leading-[0.95]">
                  and I build
                  <br />
                  <span className="font-playfair">web applications.</span>
                </span>
              </h1>

              <p className="mt-8 max-w-[440px] font-display text-[clamp(1.5rem,2.2vw,1.9rem)] font-medium leading-[1.5] tracking-[-0.01em] text-foreground lg:absolute lg:left-[6%] lg:leading-[1.75] lg:top-0 lg:mt-0 lg:max-w-[min(440px,38%)]">
                I mostly build with{" "}
                <span className="whitespace-nowrap">
                  <b className="inline-block rounded-[2px] bg-foreground px-2.5 py-0.5 font-semibold leading-[1.25] text-background">
                    Shopify
                  </b>
                  ,
                </span>{" "}
                <span className="whitespace-nowrap">
                  <b className="inline-block rounded-[2px] bg-foreground px-2.5 py-0.5 font-semibold leading-[1.25] text-background">
                    Next.js
                  </b>
                </span>{" "}
                and{" "}
                <span className="whitespace-nowrap">
                  <b className="inline-block rounded-[2px] bg-foreground px-2.5 py-0.5 font-semibold leading-[1.25] text-background">
                    Node.js
                  </b>
                  .
                </span>
              </p>
            </div>

            <div
              data-reveal
              className="relative w-full md:max-w-[440px] md:justify-self-end lg:absolute lg:right-0 lg:top-[12vh] lg:max-w-none lg:w-[56%] lg:!transform-none"
            >
              <div className="relative z-[1] aspect-[3/4] overflow-hidden bg-card lg:aspect-[3/2]">
                <Image
                  src="/assets/me-hero.jpg"
                  alt="Jimwel Cruz"
                  fill
                  sizes="(min-width: 1024px) 56vw, (min-width: 768px) 440px, 100vw"
                  quality={90}
                  priority
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="select-none object-cover object-top"
                />
              </div>
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

                <div className="grid w-full grid-cols-2 gap-6 md:flex md:w-auto md:shrink-0 md:items-center md:gap-14">
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-2">
                    <h3 className="font-display text-[30px] font-semibold leading-none md:text-[42px]">
                      {yearsExperience}
                    </h3>
                    <div className="font-body text-[16px] leading-[1.4] text-foreground/80 md:text-[18px]">
                      Years experience
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-2">
                    <h3 className="font-display text-[30px] font-semibold leading-none md:text-[42px]">
                      {projects.length}
                    </h3>
                    <div className="font-body text-[16px] leading-[1.4] text-foreground/80 md:text-[18px]">
                      Projects shipped
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline: a short rule per entry, the second step indented */}
              <ol data-reveal className="mt-20 grid gap-11 md:mt-28">
                {timeline.map((entry) => (
                  <li key={entry.title} data-reveal className="work-step">
                    <div className="flex flex-col items-start gap-2 md:inline-flex md:w-auto md:flex-row md:items-center md:gap-2.5 md:rounded-full md:border md:border-foreground/25 md:bg-foreground/[0.02] md:px-3.5 md:py-[9px] md:shadow-[0_0_28px_rgba(240,240,240,0.06)]">
                      {entry.when ? (
                        <>
                          <span className="whitespace-nowrap font-body text-[16px] leading-[1.4] text-foreground/80">
                            {entry.when}
                          </span>
                          <span
                            aria-hidden="true"
                            className="hidden h-[3px] w-[3px] shrink-0 rounded-full bg-foreground/50 md:block"
                          />
                        </>
                      ) : null}
                      <span className="inline-flex items-center rounded-full border border-foreground/25 bg-foreground/[0.02] px-3 py-1.5 font-body text-[16px] leading-[1.4] text-foreground shadow-[0_0_18px_rgba(240,240,240,0.06)] md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                        {entry.badge}
                      </span>
                    </div>
                    <h4 className="mt-3 font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.01em] md:text-[clamp(2rem,4.6vw,3.625rem)]">
                      {entry.title}
                    </h4>
                  </li>
                ))}
              </ol>

              {/* Skill groups: ruled rows, title on the left, each skill on its own line */}
              <div data-reveal className="mt-14 border-t border-foreground/25 md:mt-20">
                {skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="grid gap-3 border-b border-foreground/25 py-7 md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 md:py-8"
                  >
                    <h4 className="font-display text-[22px] font-medium leading-[1.3]">
                      {group.title}
                    </h4>
                    <ul className="grid gap-x-10 gap-y-1.5 font-body text-[18px] leading-[1.5] md:grid-cols-2">
                      {group.items.map((item) => (
                        <li key={skillLabel(item)}>{skillLabel(item)}</li>
                      ))}
                    </ul>
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
          className="relative overflow-x-clip bg-background pt-24 pb-24 md:pt-32 md:pb-32"
        >
          <div className="mx-auto w-full max-w-[84rem] px-6 md:px-12">
            <h2
              data-reveal
              className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 font-display text-[40px] uppercase leading-[1] tracking-[-0.02em] text-foreground sm:text-[54px] xl:text-[80px]"
            >
              <span>Some of my</span>
              <span className="font-playfair normal-case italic">recent work</span>
            </h2>

            {/* Staggered scatter: wide and narrow photos alternate across a 12-column grid,
                the narrow ones sit lower, and the copy is printed under each photo */}
            <div className="mt-14 grid grid-cols-1 gap-y-14 md:mt-20 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-16">
              {projects.map((project, i) => {
                const slot = showcaseSlots[i % showcaseSlots.length]!;
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
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : "image" in project && project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.description}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      priority={project.priority === true}
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : null;

                return (
                  <article
                    key={project.title}
                    data-reveal
                    style={{ transitionDelay: `${(i % 2) * 0.12}s` }}
                    className={slot.cell}
                  >
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} — open the live site`}
                      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                    >
                      <div
                        className={`relative w-full overflow-hidden rounded-2xl bg-card ${slot.ratio}`}
                      >
                        {media}
                        <span
                          className="pointer-events-none absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden="true"
                        >
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </div>

                      <div className="mt-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                        <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.4rem)] font-semibold uppercase leading-none tracking-[-0.02em] text-foreground">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 font-body text-[16px] leading-[1.4] text-foreground">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-foreground/40 px-3 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 max-w-[60ch] font-body text-[16px] leading-[1.6] text-foreground md:text-[18px]">
                        {project.description}
                      </p>
                    </Link>
                  </article>
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
          className="relative overflow-hidden bg-background pt-24 pb-24 md:pt-32 md:pb-32"
        >
          <div className="mx-auto w-full max-w-[84rem] px-6 md:px-12">
            <h2
              data-reveal
              className="font-display text-[34px] uppercase leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[44px] md:text-[clamp(2.25rem,4.4vw,4rem)]"
            >
              Questions? I&apos;ve got answers.
            </h2>

            {/* Flip cards — the question is on the front; select a card to turn it over and read the answer */}
            <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={faq.question}
                    data-reveal
                    style={{ transitionDelay: `${i * 0.08}s` }}
                    className="[perspective:1200px]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className={`block w-full rounded-2xl text-left transition-[height] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none md:h-[360px] ${
                        isOpen
                          ? faq.answer.length > 150
                            ? "h-[400px]"
                            : "h-[300px]"
                          : "h-[240px]"
                      }`}
                    >
                      <span
                        className={`relative block h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none [transform-style:preserve-3d] ${
                          isOpen ? "[transform:rotateY(180deg)]" : ""
                        }`}
                      >
                        <span className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-foreground p-6 text-background [backface-visibility:hidden] md:p-7">
                          <span className="font-display text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.08] tracking-[-0.02em]">
                            {faq.question}
                          </span>
                          <span className="flex items-center justify-between gap-4">
                            <span className="font-body text-[16px] font-semibold text-background">
                              Read answer
                            </span>
                            <span
                              className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground"
                              aria-hidden="true"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14M13 6l6 6-6 6" />
                              </svg>
                            </span>
                          </span>
                        </span>
                        <span
                          id={`faq-panel-${i}`}
                          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-foreground bg-background p-6 text-foreground [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-7"
                        >
                          <span className="font-body text-[16px] leading-[1.6] text-foreground md:text-[18px]">
                            {keepTerm(faq.answer)}
                          </span>
                          <span className="flex items-center justify-between gap-4 border-t border-foreground pt-5">
                            <span className="font-body text-[16px] font-semibold text-foreground">
                              Close
                            </span>
                            <span
                              className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background"
                              aria-hidden="true"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M6 6l12 12M18 6L6 18" />
                              </svg>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
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
