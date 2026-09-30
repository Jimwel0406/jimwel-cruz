import CloudLayer from "@/components/CloudLayer";
import Container from "@/components/Container";
import ForestSilhouette from "@/components/ForestSilhouette";
import MeteorLayer from "@/components/MeteorLayer";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Code2,
  Frame,
  Eye,
  MonitorSmartphone,
  ShoppingCart,
  Gauge,
  Sparkles,
  BrainCircuit,
  MessageSquareCode,
} from "lucide-react";

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

const getFaqs = (years: number, projectCount: number) => [
  {
    question: "What kind of work do you do?",
    answer:
      "Full-stack development, e-commerce development, UI implementation, performance optimization, accessibility audits, and responsive design — from React and Next.js front-ends to Node.js, PHP, and Shopify back-ends.",
  },
  {
    question: "Are you free for freelance work?",
    answer:
      "Yes. I'm currently available for freelance work and open to discussing new opportunities. The fastest way to get a reply is an email to jimwelscruz0406@gmail.com.",
  },
  {
    question: "How long have you been at this?",
    answer: `Over ${years} years as a full-stack developer, delivering ${projectCount}+ products from ideation and wireframing through prototyping to final delivery.`,
  },
];

const START_YEAR = 2023;

const aiTools = [
  {
    title: "AI-Assisted Development",
    description:
      "I use AI tools to speed up coding — writing boilerplate, fixing bugs, and reviewing code. But I always check the output, especially for database queries and anything involving sensitive data.",
    icon: BrainCircuit,
  },
  {
    title: "Vibe Coding",
    description:
      "I describe what I want in plain language, AI generates the code, then I refine it. It helps me turn ideas into working features fast without starting from scratch.",
    icon: MessageSquareCode,
  },
  {
    title: "AI-Augmented Workflow",
    description:
      "AI handles the repetitive parts — generating code, optimizing performance, testing — so I can focus on design, architecture, and making sure everything works correctly.",
    icon: Sparkles,
  },
];

const timeline = [
  {
    year: "2023",
    entries: [
      { title: "Full Stack Web Developer", org: "Sport Formula", latest: true },
      { title: "Diploma in Information Technology", org: "", latest: false },
    ],
  },
];

export default function Home() {
  const yearsExperience = new Date().getFullYear() - START_YEAR;
  const faqs = getFaqs(yearsExperience, projects.length);
  const stats = [
    { value: yearsExperience.toString().padStart(2, "0"), label: "Years of experience" },
    { value: projects.length.toString(), label: "Projects shipped" },
    { value: "PH", label: "Based in the Philippines" },
  ];
  const [modalImage, setModalImage] = useState<string | null>(null);

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
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://jimwel-cruz.vercel.app/",
                    },
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
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
          className="night-sky relative flex h-[100vh] max-h-[75vh] md:max-h-none flex-col justify-end overflow-hidden px-6 pb-24 pt-32 md:px-12 md:pb-32"
        >
          {/* CSS Sky gradient */}
          <div className="sky-gradient absolute inset-0 z-0" aria-hidden="true" />

          {/* Canvas — Clouds, Nebula wash, Horizon haze */}
          <CloudLayer />

          {/* Canvas — Stars, Trails, Glow, Particles */}
          <canvas
            ref={(canvas) => {
              if (!canvas) return;
              const ctx = canvas.getContext("2d");
              if (!ctx) return;

              let w = (canvas.width = canvas.offsetWidth);
              let h = (canvas.height = canvas.offsetHeight);

              // --- Stars ---
              const stars: { x: number; y: number; r: number; alpha: number; twinkleSpeed: number }[] = [];
              const STAR_COUNT = w < 768 ? 80 : 200;
              for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                  x: Math.random() * w,
                  y: Math.random() * h * 0.7,
                  r: Math.random() * 1.5 + 0.3,
                  alpha: Math.random() * 0.8 + 0.2,
                  twinkleSpeed: Math.random() * 0.003 + 0.001,
                });
              }

              // --- Atmospheric particles ---
              const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
              const PARTICLE_COUNT = 30;
              for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                  x: Math.random() * w,
                  y: Math.random() * h,
                  vx: (Math.random() - 0.5) * 0.3,
                  vy: -Math.random() * 0.2 - 0.05,
                  r: Math.random() * 1.5 + 0.5,
                  alpha: Math.random() * 0.15 + 0.03,
                });
              }

              let time = 0;

              const draw = () => {
                time++;
                ctx.clearRect(0, 0, w, h);

                // Draw stars
                for (const s of stars) {
                  const twinkle = Math.sin(time * s.twinkleSpeed) * 0.3 + 0.7;
                  const a = s.alpha * twinkle;
                  ctx.beginPath();
                  ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                  ctx.fillStyle = `rgba(255,255,255,${a})`;
                  ctx.fill();
                }

                // Draw atmospheric particles
                for (const p of particles) {
                  p.x += p.vx;
                  p.y += p.vy;
                  if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
                  if (p.x < -10) p.x = w + 10;
                  if (p.x > w + 10) p.x = -10;

                  ctx.beginPath();
                  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                  ctx.fillStyle = `rgba(200,255,0,${p.alpha})`;
                  ctx.fill();
                }

                requestAnimationFrame(draw);
              };

              requestAnimationFrame(draw);

              const onResize = () => {
                const prevW = w;
                const prevH = h;
                w = canvas.width = canvas.offsetWidth;
                h = canvas.height = canvas.offsetHeight;
                const sx = w / prevW;
                const sy = h / prevH;
                stars.forEach((s) => { s.x *= sx; s.y *= sy; });
                particles.forEach((p) => { p.x *= sx; p.y *= sy; });
              };
              window.addEventListener("resize", onResize);
            }}
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
          />

          {/* WebGL — 3D shooting stars + sky light */}
          <MeteorLayer />

          {/* Forest silhouette */}
          <ForestSilhouette />

          <div className="container relative z-10 mx-auto max-w-5xl">
            <h1
              data-reveal
              className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.04em]"
            >
              <span className="block">I build</span>
              <span className="block text-accent">
                <span className="word-cycle">
                  <span className="word-cycle-inner">
                    <span className="word-cycle-item">digital</span>
                    <span className="word-cycle-item">web</span>
                    <span className="word-cycle-item">clean</span>
                    <span className="word-cycle-item">fast</span>
                    <span className="word-cycle-item">modern</span>
                    <span className="word-cycle-item">digital</span>
                  </span>
                </span>
              </span>
              <span className="block">experiences.</span>
            </h1>
          </div>

          {/* Scroll indicator */}
        </section>

        {/* ============================================
            ABOUT
        ============================================ */}
        <section id="about" className="relative overflow-hidden bg-white text-black">
          {/* Colour event — full-bleed accent plane */}
          <div data-nav-theme="light" className="bg-plane">
            <div className="container mx-auto max-w-6xl px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-24">
              <h2
                data-reveal
                className="max-w-[15ch] font-display text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.04em]"
              >
                I&apos;m a full stack web developer.
              </h2>

              <div
                data-reveal
                className="mt-14 border-t border-black/30 pt-8"
              >
                <p className="font-display text-2xl font-medium leading-[1.15] tracking-[-0.02em] md:text-3xl">
                  3 years in, still learning.
                </p>
              </div>
            </div>
          </div>

          {/* Experience — full-bleed portrait owns the right, ruled ledger on the left */}
          <div data-nav-theme="light" className="relative overflow-hidden">
            <div
              data-reveal
              className="relative h-[26rem] w-full sm:h-[30rem] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[50vw] md:max-w-[44rem]"
            >
              <Image
                src="/assets/me.jpg"
                alt="Jimwel Cruz"
                fill
                sizes="(max-width: 768px) 100vw, 44rem"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="select-none object-cover object-[50%_22%]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-6 md:p-8"
                aria-hidden="true"
              >
                <p className="font-body text-xs font-medium tracking-[0.08em] text-white">
                  Jimwel Cruz
                </p>
                <p className="mt-1 font-body text-xs tracking-[0.08em] text-white/70">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <div className="container relative mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
              <div className="md:max-w-[32rem]">
                <h3
                  data-reveal
                  className="border-b-2 border-black pb-6 font-display text-3xl font-medium tracking-[-0.03em] md:text-5xl"
                >
                  Experience
                </h3>

                {timeline.map((group) => (
                  <div
                    key={group.year}
                    data-reveal
                    className="border-b border-black/10 py-10 md:py-12"
                  >
                    {/* Year rail — demoted from the oversized numeral */}
                    <div className="flex items-center gap-4">
                      <span className="font-display text-sm font-semibold tabular-nums tracking-[0.16em] text-black/70">
                        {group.year}
                      </span>
                      <span
                        className="h-px flex-1 bg-black/15"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-7 divide-y divide-black/15">
                      {group.entries.map((entry) => (
                        <div
                          key={entry.title}
                          className="relative py-6 pl-4 first:pt-0 last:pb-0"
                        >
                          {entry.latest ? (
                            <span
                              className="absolute inset-y-0 left-0 w-0.5 bg-accent"
                              aria-hidden="true"
                            />
                          ) : null}
                          <h4 className="font-playfair text-2xl font-medium leading-[1.12] tracking-[-0.01em] md:text-[1.6rem]">
                            {entry.title}
                          </h4>
                          {entry.org ? (
                            <p className="mt-2 font-body text-sm text-black/50">
                              {entry.org}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dark stat band with inner glow */}
          <div
            data-nav-theme="dark"
            className="relative"
            style={{
              backgroundColor: "#0a0a0a",
              backgroundImage:
                "radial-gradient(125% 150% at 50% 118%, rgba(200,255,0,0.22), rgba(200,255,0,0) 58%)",
            }}
          >
            <div className="container mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 px-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-12">
              {stats.map((stat) => (
                <div key={stat.label} data-reveal className="py-12 md:px-10 md:py-16">
                  <p className="font-display text-5xl font-medium leading-none tracking-[-0.03em] text-accent md:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-5 font-body text-xs font-bold uppercase tracking-[0.1em] text-white/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            WORK
        ============================================ */}
        <section
          id="work"
          data-nav-theme="dark"
          className="relative overflow-hidden bg-[#141414] pt-24 md:pt-32"
        >
          {/* Inner glow — keeps the dark band from reading as a hole */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(120% 100% at 50% 0%, rgba(200,255,0,0.09), rgba(200,255,0,0) 65%)",
            }}
          />

          <h2
            data-reveal
            className="relative px-6 font-display text-[clamp(2.75rem,9vw,6rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white md:px-12"
          >
            Selected
            <br />
            <span className="text-transparent text-stroke">
              Projects
            </span>
          </h2>

          {/* Full-bleed uniform media wall — 0 gap, hairline dividers */}
          <div className="relative mt-16 grid grid-cols-1 border-t border-white/10 md:mt-20 md:grid-cols-2">
            {projects.map((project, i) => (
              <article
                key={project.title}
                data-reveal
                className={`group relative h-[26rem] overflow-hidden border-b border-white/10 sm:h-[28rem] md:h-[clamp(22rem,34vw,30rem)] ${
                  i % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} — open the live site`}
                  className="absolute inset-0 block"
                >
                  {"video" in project && project.video ? (
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
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    />
                  ) : "image" in project && project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.description}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={project.priority === true}
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}

                  {/* Scrims — bottom for copy, top for the index numeral */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/55 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                    <div className="flex items-start justify-end">
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-6 w-6 text-accent transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>

                    <div>
                      <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-md font-body text-base leading-relaxed text-white/75">
                        {project.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                        {project.tags.map((tag, ti) => (
                          <li
                            key={tag}
                            className="flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/90"
                          >
                            {ti > 0 ? (
                              <span
                                className="h-3 w-px bg-accent/40"
                                aria-hidden="true"
                              />
                            ) : null}
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================
            SKILLS
        ============================================ */}
        <section
          id="skills"
          data-nav-theme="dark"
          className="relative overflow-hidden"
          style={{
            backgroundColor: "#0d1000",
            backgroundImage:
              "radial-gradient(130% 120% at 12% 0%, rgba(200,255,0,0.14), rgba(200,255,0,0) 58%)",
          }}
        >
          {/* Second glow — keeps the tinted field from reading as a flat hole */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(80% 120% at 88% 100%, rgba(159,232,112,0.12), rgba(159,232,112,0) 62%)",
            }}
          />

          {/* Dominant — the headline at section scale, no eyebrow, no subhead */}
          <h2
            data-reveal
            className="relative px-6 pt-24 font-display text-[clamp(2.75rem,10vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white md:px-12 md:pt-32"
          >
            What I
            <br />
            <span className="text-transparent text-stroke">
              Work With
            </span>
          </h2>

          {/* Full-bleed capability wall — 4-up, 0 gap, hairline dividers, one hue per cell */}
          <div className="relative mt-16 grid grid-cols-1 border-t border-white/10 md:mt-20 md:grid-cols-4 md:items-start">
            {/* Full-height column rules — panels hug their own content, rules run the whole wall */}
            <div
              className="pointer-events-none absolute inset-0 hidden md:block"
              aria-hidden="true"
            >
              {[25, 50, 75].map((left) => (
                <span
                  key={left}
                  className="absolute inset-y-0 w-px bg-white/10"
                  style={{ left: `${left}%` }}
                />
              ))}
            </div>

            {skillGroups.map((group, i) => {
              const hue = i % 2 === 0 ? "#c8ff00" : "#9fe870";
              return (
                <div
                  key={group.title}
                  data-reveal
                  className="relative border-b border-white/10 p-6 md:border-b-0 md:p-8"
                >
                  {/* Per-cell hue tint */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{
                      backgroundImage: `linear-gradient(180deg, ${hue}16, ${hue}00 44%)`,
                    }}
                  />

                  <div className="relative flex h-full flex-col">
                    <h3 className="font-display text-2xl font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-[1.75rem]">
                      {group.title}
                    </h3>

                    <ul className="mt-6 divide-y divide-white/10 border-t border-white/10">
                      {group.items.map((item) => {
                        const label =
                          typeof item === "string" ? item : item.label;
                        const note = typeof item === "string" ? null : item.note;
                        return (
                          <li
                            key={label}
                            className="py-3 font-body text-[0.95rem] font-medium leading-snug text-white/75 transition-colors hover:text-white"
                          >
                            {note ? (
                              <span>
                                <span className="text-white">{label}</span>{" "}
                                <span className="text-white/40">{note}</span>
                              </span>
                            ) : (
                              label
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================
            AI-ASSISTED DEVELOPMENT
        ============================================ */}
        <section
          data-nav-theme="dark"
          className="relative overflow-hidden bg-[#141414]"
        >
          {/* Faint grid pattern */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Dominant — headline only, no eyebrow, no supporting copy */}
          <h2
            data-reveal
            className="relative px-6 pt-20 font-display text-[clamp(2.5rem,9vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white md:px-12 md:pt-24"
          >
            Smarter With
            <br />
            <span className="text-transparent text-stroke">
              AI
            </span>
          </h2>

          {/* Full-bleed tool wall — 3-up, 0 gap, hairline rules, one hue per cell */}
          <div className="relative mt-12 grid grid-cols-1 border-y border-white/10 md:mt-14 md:grid-cols-3 md:items-start">
            {/* Full-height column rules — cells hug their own content */}
            <div
              className="pointer-events-none absolute inset-0 hidden md:block"
              aria-hidden="true"
            >
              {[33.3333, 66.6666].map((left) => (
                <span
                  key={left}
                  className="absolute inset-y-0 w-px bg-white/10"
                  style={{ left: `${left}%` }}
                />
              ))}
            </div>

            {aiTools.map((tool, i) => {
              const hue = i % 2 === 0 ? "#c8ff00" : "#9fe870";
              return (
                <div
                  data-reveal
                  key={tool.title}
                  className="group relative border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:p-8"
                  style={{
                    backgroundImage: `linear-gradient(180deg, ${hue}16, ${hue}00 44%)`,
                  }}
                >
                  <tool.icon
                    className="mb-5 transition-transform group-hover:scale-110"
                    style={{ color: hue }}
                    size={22}
                  />
                  <h3 className="font-display text-2xl font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-[1.75rem]">
                    {tool.title}
                  </h3>
                  <p className="mt-4 font-body text-[0.95rem] font-medium leading-snug text-white/70">
                    {tool.description}
                  </p>
                </div>
              );
            })}
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
            PERFORMANCE OPTIMIZATION
        ============================================ */}
        <section className="relative overflow-hidden bg-[#141414]">
          {/* Dominant — headline only, no eyebrow */}
          <h2
            data-reveal
            className="px-6 pt-20 font-display text-[clamp(2.5rem,9vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white md:px-12 md:pt-24"
          >
            Speed
            <br />
            <span className="text-transparent text-stroke">
              Matters
            </span>
          </h2>

          <p
            data-reveal
            className="mt-6 max-w-lg px-6 font-body text-base font-medium leading-relaxed text-white/70 md:px-12 md:text-lg"
          >
            Optimizing load times, core web vitals, and overall performance to deliver fast, smooth experiences.{" "}
            <span className="font-bold text-accent">
              Load speed now under 1 second.
            </span>
          </p>

          {/* Full-bleed audit wall — 2-up, 0 gap, hairline rules, one hue per cell */}
          <div className="relative mt-12 grid grid-cols-1 border-y border-white/10 md:mt-14 md:grid-cols-2">
            <div
              className="pointer-events-none absolute inset-0 hidden md:block"
              aria-hidden="true"
            >
              <span
                className="absolute inset-y-0 w-px bg-white/10"
                style={{ left: "50%" }}
              />
            </div>

            {[
              {
                label: "Google PageSpeed Insights",
                before: "/assets/projects/pagespeed-insight-before.jpg",
                after: "/assets/projects/pagespeed-insight-after.jpg",
                altBefore: "PageSpeed Insights before optimization",
                altAfter: "PageSpeed Insights after optimization",
              },
              {
                label: "Pingdom",
                before: "/assets/projects/pingdom-before.jpg",
                after: "/assets/projects/pingdom-after.jpg",
                altBefore: "Pingdom before optimization",
                altAfter: "Pingdom after optimization",
              },
            ].map((audit, i) => {
              const hue = i % 2 === 0 ? "#c8ff00" : "#9fe870";
              return (
                <div
                  data-reveal
                  key={audit.label}
                  className="relative border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:p-8"
                  style={{
                    backgroundImage: `linear-gradient(180deg, ${hue}16, ${hue}00 44%)`,
                  }}
                >
                  <h3 className="mb-6 font-display text-2xl font-medium leading-[1.1] tracking-[-0.02em] text-white md:text-[1.75rem]">
                    {audit.label}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-white/40">
                        Before
                      </p>
                      <button
                        type="button"
                        onClick={() => setModalImage(audit.before)}
                        className="cursor-zoom-in"
                      >
                        <Image
                          src={audit.before}
                          alt={audit.altBefore}
                          width={600}
                          height={400}
                          className="h-32 w-full border border-white/10 object-cover md:h-48"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </button>
                    </div>
                    <div>
                      <p
                        className="mb-3 text-xs font-bold uppercase tracking-[0.1em]"
                        style={{ color: hue }}
                      >
                        After
                      </p>
                      <button
                        type="button"
                        onClick={() => setModalImage(audit.after)}
                        className="cursor-zoom-in"
                      >
                        <Image
                          src={audit.after}
                          alt={audit.altAfter}
                          width={600}
                          height={400}
                          className="h-32 w-full border object-cover md:h-48"
                          style={{ borderColor: `${hue}66` }}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================
            FAQ
        ============================================ */}
        <section className="relative overflow-hidden bg-[#141414]">
          {/* Dominant — headline only, no eyebrow */}
          <h2
            data-reveal
            className="px-6 pt-20 font-display text-[clamp(2.25rem,7.5vw,6rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white md:px-12 md:pt-24"
          >
            Things people
            <br />
            <span className="text-transparent text-stroke">
              ask me.
            </span>
          </h2>

          {/* Full-bleed list — hairline rows, one hue per row */}
          <div className="relative mt-12 border-y border-white/10 md:mt-14">
            {faqs.map((faq, i) => {
              const hue = i % 2 === 0 ? "#c8ff00" : "#9fe870";
              return (
                <details
                  data-reveal
                  key={faq.question}
                  className="group relative border-b border-white/10 last:border-b-0 [&[open]_svg]:rotate-45"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${hue}14, ${hue}00 38%)`,
                  }}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-6 outline-none [&::-webkit-details-marker]:hidden md:px-12 md:py-7">
                    <span className="max-w-3xl font-display text-xl font-medium leading-snug tracking-[-0.02em] text-white md:text-2xl">
                      {faq.question}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300"
                      style={{ color: hue }}
                      aria-hidden="true"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-8 md:px-12">
                    <p className="max-w-3xl font-body text-base font-medium leading-relaxed text-white/70">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        {/* ============================================
            CONTACT
        ============================================ */}
        <section
          id="contact"
          className="relative overflow-hidden"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <div
            data-nav-theme="light"
            className="pb-24 pt-28 text-black md:pb-32 md:pt-40"
          >
            {/* Dominant — headline only, no eyebrow */}
            <h2
              data-reveal
              className="isolate px-6 font-display text-[clamp(2.75rem,10vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.04em] md:px-12"
            >
              Let&apos;s build
              <br />
              something{" "}
              <span className="relative inline-block">
                great.
                <span
                  className="absolute inset-x-0 bottom-[0.14em] -z-10 h-[0.3em] bg-accent"
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* Full-bleed CTA row — inverts on hover */}
            <Link
              data-reveal
              href="mailto:jimwelscruz0406@gmail.com"
              className="group mt-14 flex items-center justify-between gap-4 border-y border-black/15 px-6 py-7 transition-colors hover:bg-black hover:text-[#f0f0f0] md:mt-16 md:gap-8 md:px-12 md:py-9"
            >
              <span className="font-display text-lg font-medium tracking-[-0.02em] sm:text-2xl md:text-3xl">
                jimwelscruz0406@gmail.com
              </span>
              <ArrowUpRight
                className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-8 md:w-8"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
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
