import Container from "@/components/Container";
import ContactSection from "@/components/ContactSection";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Code2,
  Eye,
  Frame,
  Gauge,
  GraduationCap,
  MonitorSmartphone,
  Search,
  Server,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE } from "@/lib/seo";

const projects = [
  {
    title: "Marrow",
    description:
      "Homepage design study for a streetwear label. Cinematic ink-and-ivory art direction with oversized editorial type, film-grain photography, and a seven-section single-page flow.",
    video: "/assets/projects/marrow.mp4",
    href: "https://marrow-silk.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "UI Design"],
  },
  {
    title: "FoxHound Bee",
    description:
      "Homepage design study for a fictional apiary. Warm cream-and-ember paper palette, a rationed orange accent, a hexagonal comb grid, and a hand-drawn icon sprite.",
    video: "/assets/projects/foxhoundbee.mp4",
    href: "https://foxhound-bee.vercel.app/",
    tags: ["Next.js", "React", "CSS", "UI Design"],
  },
  {
    title: "crumb.",
    description:
      "Homepage design study for a fictional cupcake shop. Cream-and-dough palette, hand-drawn ink outlines, scalloped section seams, and a real-time 3D hero.",
    video: "/assets/projects/crumb.mp4",
    href: "https://crumb-drab.vercel.app/",
    tags: ["Next.js", "Three.js", "React Three Fiber", "UI Design"],
  },
  // Hidden for now — restore by removing the comment markers
  // {
  //   title: "Burger Shop",
  //   description:
  //     "Homepage design study for a fictional smash-burger restaurant. Dark high-contrast palette, condensed display type, torn-paper details, and full-bleed food photography.",
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
  },
  {
    question: "How long have you been at this?",
    answer: `Over ${years} years as a full-stack developer.`,
  },
];

const START_YEAR = 2023;

type ExperienceCard = {
  icon: LucideIcon;
  badge: string;
  title: string;
  items: string[];
  date: string;
};

const skillGroupIcons: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  Tools: Wrench,
  SEO: Search,
};

const experience: ExperienceCard[] = [
  {
    icon: Briefcase,
    badge: "Current",
    title: "Full Stack Web Developer",
    items: ["Frontend", "Backend", "Tools", "SEO"],
    date: "Sport Formula · 2023 — Present",
  },
  {
    icon: GraduationCap,
    badge: "Diploma",
    title: "Diploma in Information Technology",
    items: [],
    date: "",
  },
  ...skillGroups.map((group) => ({
    icon: skillGroupIcons[group.title] ?? Code2,
    badge: `${group.items.length} skills`,
    title: group.title,
    items: group.items.map((item) =>
      typeof item === "string" ? item : item.label
    ),
    date: "",
  })),
];

export default function Home() {
  const yearsExperience = new Date().getFullYear() - START_YEAR;
  const faqs = getFaqs(yearsExperience);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    // Step one whole card so mandatory snapping doesn't drag it back.
    const step = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : el.clientWidth * 0.42;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

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
          className="relative flex flex-col items-center justify-center bg-background px-4 py-[86px] md:px-12 md:py-[200px]"
        >
          <div className="flex w-full max-w-[66.5rem] flex-col items-center text-center">
            <div data-reveal className="mb-6 md:mb-11">
              <div className="relative h-[180px] w-[180px] overflow-hidden rounded-full md:h-[240px] md:w-[240px]">
                <Image
                  src="/assets/me.jpg"
                  alt="Jimwel Cruz"
                  fill
                  sizes="(min-width: 768px) 360px, 270px"
                  quality={90}
                  priority
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="select-none object-cover"
                />
              </div>
            </div>

            <h1
              data-reveal
              className="font-display text-[42px] font-medium leading-[54px] text-foreground md:text-[90px] md:leading-[104px]"
            >
              I&apos;m Jimwel, and I build{" "}
              <br className="hidden md:inline" />
              web applications.
            </h1>

            <p
              data-reveal
              className="mt-6 max-w-[880px] text-[18px] font-medium leading-[30px] text-muted-foreground md:text-[24px] md:leading-[42px]"
            >
              A full stack web developer based in the Philippines — building fast, accessible
              websites and web apps with React, Next.js and Node.js.
            </p>
          </div>

          {/* Scroll indicator */}
        </section>

        {/* ============================================
            ABOUT
        ============================================ */}
        <section id="about" className="relative overflow-hidden bg-white text-black">
          {/* Experience — title + counters beside a card slider */}
          <div
            data-nav-theme="dark"
            className="relative overflow-hidden bg-background text-foreground"
          >
            <div className="container relative mx-auto max-w-6xl px-6 pb-[86px] pt-20 md:px-12 md:pb-[140px]">
              <div className="grid grid-cols-1 gap-[30px] md:gap-[50px] xl:grid-cols-[minmax(350px,0.25fr)_1fr] xl:gap-[100px]">
                {/* Left: heading, intro, counters */}
                <div
                  data-reveal
                  className="flex flex-col justify-between gap-12"
                >
                  <div className="flex flex-col gap-5">
                    <h2 className="font-display text-[36px] font-semibold leading-[1.3] tracking-[-0.02em] md:text-[56px]">
                      Work experience
                    </h2>
                  </div>

                  <div className="flex flex-col gap-[15px] sm:flex-row sm:gap-10 xl:justify-between">
                    <div>
                      <h3 className="font-display text-[26px] font-semibold leading-[1.3] md:text-[30px] xl:text-[42px]">
                        {yearsExperience.toString().padStart(2, "0")}
                      </h3>
                      <div className="font-body text-[16px] leading-[1.4] md:text-[18px]">
                        Years experience
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-[26px] font-semibold leading-[1.3] md:text-[30px] xl:text-[42px]">
                        {projects.length.toString().padStart(2, "0")}
                      </h3>
                      <div className="font-body text-[16px] leading-[1.4] md:text-[18px]">
                        Projects shipped
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: slider */}
                <div data-reveal className="relative min-w-0">
                  <div
                    ref={railRef}
                    className="flex snap-x snap-mandatory items-stretch gap-[30px] overflow-x-auto pb-1 xl:gap-[50px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {experience.map((card) => {
                      const Icon = card.icon;
                      return (
                        <article
                          key={card.title}
                          className="flex w-[85%] shrink-0 snap-start flex-col bg-card p-[15px] text-foreground sm:w-[360px] md:w-[420px] xl:w-[470px] xl:p-[50px]"
                        >
                          <div className="mb-[15px] flex items-center justify-between gap-4 xl:mb-[50px]">
                            <Icon
                              className="h-6 w-6 xl:h-[30px] xl:w-[30px]"
                              aria-hidden="true"
                            />
                            <span className="rounded-[10px] border border-foreground/25 px-[6px] py-[4px] font-body text-[12px] leading-[1em] text-foreground/80">
                              {card.badge}
                            </span>
                          </div>

                          <h4 className="mb-[20px] font-display text-[20px] font-semibold leading-[1.3] xl:mb-[30px] xl:text-[36px]">
                            {card.title}
                          </h4>

                          {card.items.length > 0 ? (
                            <ul className="mb-[30px] list-disc pl-10 font-body text-[16px] leading-[1.4] xl:mb-[50px] xl:text-[18px]">
                              {card.items.map((item) => (
                                <li key={item} className="mb-[10px] last:mb-0">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          {card.date ? (
                            <div className="mt-auto font-body text-[16px] leading-[1.4] xl:text-[18px]">
                              {card.date}
                            </div>
                          ) : null}
                        </article>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollRail(-1)}
                    aria-label="Previous experience"
                    className="absolute -left-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 rotate-45 items-center justify-center border border-foreground/30 bg-card text-foreground transition-colors hover:bg-foreground hover:text-background md:flex"
                  >
                    <ArrowLeft
                      className="h-5 w-5 -rotate-45"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRail(1)}
                    aria-label="Next experience"
                    className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 rotate-45 items-center justify-center border border-foreground/30 bg-card text-foreground transition-colors hover:bg-foreground hover:text-background md:flex"
                  >
                    <ArrowRight
                      className="h-5 w-5 -rotate-45"
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mobile controls — same rotated-square arrows, below the rail */}
                  <div className="mt-6 flex items-center gap-6 md:hidden">
                    <button
                      type="button"
                      onClick={() => scrollRail(-1)}
                      aria-label="Previous experience"
                      className="flex h-11 w-11 rotate-45 items-center justify-center border border-foreground/30 bg-card text-foreground transition-colors active:bg-foreground active:text-background"
                    >
                      <ArrowLeft
                        className="h-5 w-5 -rotate-45"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollRail(1)}
                      aria-label="Next experience"
                      className="flex h-11 w-11 rotate-45 items-center justify-center border border-foreground/30 bg-card text-foreground transition-colors active:bg-foreground active:text-background"
                    >
                      <ArrowRight
                        className="h-5 w-5 -rotate-45"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
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
          className="relative overflow-hidden bg-background pt-24 pb-4 md:pt-32 md:pb-8"
        >
          <div className="mx-auto w-full max-w-[84rem] px-6 md:px-12">
            <h2
              data-reveal
              className="mx-auto max-w-[22ch] text-center font-display text-[44px] uppercase leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[54px] xl:text-[80px]"
            >
              Some of my recent work
            </h2>

            <div className="mt-14 flex flex-col gap-[50px] md:mt-20 md:gap-[80px] xl:gap-[120px]">
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
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : "image" in project && project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.description}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={project.priority === true}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : null;

                return (
                  <article
                    key={project.title}
                    data-reveal
                    className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_1.75fr]"
                  >
                    {/* Dark info card */}
                    <div className="flex flex-col justify-between gap-6 rounded-2xl bg-card p-6 md:p-8">
                      <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-foreground/30 font-body text-lg leading-none text-foreground/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="font-display text-[26px] uppercase leading-[1.15] tracking-[-0.01em] text-foreground md:text-[32px]">
                          <Link
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200 hover:text-foreground/60"
                          >
                            {project.title}
                          </Link>
                        </h3>
                        <p className="mt-4 max-w-[46ch] font-body text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Media */}
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} — open the live site`}
                      className="group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-card lg:aspect-auto lg:min-h-[420px]"
                    >
                      {media}
                      <span
                        className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/45"
                        aria-hidden="true"
                      />
                      <span
                        className="pointer-events-none absolute bottom-5 right-5 flex h-[56px] w-[56px] translate-y-2 items-center justify-center rounded-2xl bg-foreground text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="h-6 w-6" />
                      </span>
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
          data-nav-theme="dark"
          className="relative overflow-hidden bg-background pt-24 pb-24 md:pt-32 md:pb-32"
        >
          <div className="mx-auto w-full max-w-[84rem] px-6 md:px-12">
            <h2
              data-reveal
              className="mx-auto text-center font-display text-[34px] uppercase leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[44px] md:whitespace-nowrap md:text-[clamp(2.25rem,4.4vw,4rem)]"
            >
              Questions? I&apos;ve got answers.
            </h2>

            {/* Stacked cards — hairline border, plus that turns to cross */}
            <div className="mt-14 flex flex-col gap-3 md:mt-20">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={faq.question}
                    data-reveal
                    data-open={isOpen ? "true" : "false"}
                    className="rounded-2xl border border-foreground/10 bg-card transition-colors duration-300 data-[open=true]:border-foreground/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-6 p-6 text-left md:p-8"
                    >
                      <span className="font-display text-[18px] leading-[1.25] tracking-[-0.01em] text-foreground md:text-[24px]">
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-foreground text-foreground"
                            : "border-foreground/30 text-foreground/80"
                        }`}
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 18 18"
                          fill="none"
                          className="h-[18px] w-[18px]"
                        >
                          <path
                            d="M9 3.75V14.25"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.75 9H14.25"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`faq-panel-${i}`}
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[46ch] px-6 pb-6 font-body text-[16px] leading-relaxed text-muted-foreground md:px-8 md:pb-8 md:text-[18px]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
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
