import Container from "@/components/Container";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
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
    title: "ModernHaven",
    description:
      "E-commerce store for modern furniture. Full-stack build with Next.js, Stripe payments, and real-time inventory management.",
    image: "/assets/projects/modernhaven.webp",
    video: "/assets/projects/modernhaven.mp4",
    href: "https://modern-haven-nine.vercel.app/",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    priority: true,
  },
  {
    title: "ContactFlow",
    description:
      "CRM platform for managing customer interactions. Dashboard with role-based access, analytics, and responsive data visualization.",
    image: "/assets/projects/contactflow.webp",
    video: "/assets/projects/contactflow.mp4",
    href: "https://contactflow-crm.vercel.app/",
    tags: ["React", "Node.js", "REST API"],
  },
  {
    title: "Quizipedia",
    description:
      "Interactive trivia and quiz game. Real-time scoring, category filters, and a clean responsive interface.",
    image: "/assets/projects/quizipedia.webp",
    href: "https://quizipedia.epizy.com/",
    tags: ["JavaScript", "API", "CSS"],
  },
  {
    title: "Whack-A-Mole",
    description:
      "Classic arcade-style whack-a-mole game. Vanilla HTML/CSS/JS with score tracking and responsive controls.",
    image: "/assets/projects/whackamole.webp",
    href: "/projects/mole-bash",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Calculator",
    description:
      "Modern and responsive calculator app. Clean UI with keyboard support and arithmetic operations.",
    image: "/assets/projects/calculator.webp",
    href: "/projects/calculator",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Block Puzzle",
    description:
      "Relaxing block puzzle game. Canvas-based logic with smooth animations and mobile-first controls.",
    image: "/assets/projects/blockpuzzle.webp",
    href: "https://block-puzzle-board.vercel.app/",
    tags: ["Canvas", "JavaScript", "Game Dev"],
  },
];

const skillGroups = [
  {
    title: "Frontend",
    items: [
      "HTML / Semantic Markup",
      "CSS / Sass / Tailwind",
      "JavaScript / TypeScript",
      "React / Next.js",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js / Express",
      "PHP",
      "PostgreSQL / MongoDB",
      "REST / GraphQL APIs",
      "Shopify / Liquid",
    ],
  },
  {
    title: "Tools & DevOps",
    items: [
      "Git / GitHub Actions",
      "Vercel / Netlify",
      "CI/CD Pipelines",
      "Performance Optimization",
      "Responsive Design",
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
    question: "What services does Jimwel Cruz offer?",
    answer:
      "Full-stack development, e-commerce development, UI implementation, performance optimization, accessibility audits, and responsive design — from React and Next.js front-ends to Node.js, PHP, and Shopify back-ends.",
  },
  {
    question: "Is Jimwel available for freelance work?",
    answer:
      "Yes. Jimwel is currently available for freelance work and open to discussing new opportunities. The fastest way to get a reply is an email to jimwelscruz0406@gmail.com.",
  },
  {
    question: "How much experience does Jimwel have?",
    answer: `Over ${years} years as a full-stack developer and web team lead, delivering ${projectCount}+ products from ideation and wireframing through prototyping to final delivery while mentoring teammates along the way.`,
  },
];

const START_YEAR = 2023;

const aiTools = [
  {
    title: "AI-Assisted Development",
    description:
      "I use AI coding agents and LLM-powered tools to accelerate development — from scaffolding and debugging to code review and architecture decisions. AI doesn't replace my judgment; it amplifies it.",
    icon: BrainCircuit,
  },
  {
    title: "Vibe Coding",
    description:
      "Rapidly prototyping ideas by iterating with AI in real-time. I describe what I want, refine the output, and ship faster — turning concepts into working code through natural conversation.",
    icon: MessageSquareCode,
  },
  {
    title: "AI-Augmented Workflow",
    description:
      "From generating boilerplate to optimizing performance, I integrate AI into every stage of the development lifecycle so I can focus on the creative and strategic parts that matter most.",
    icon: Sparkles,
  },
];

export default function Home() {
  const yearsExperience = new Date().getFullYear() - START_YEAR;
  const faqs = getFaqs(yearsExperience, projects.length);

  // scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      els.forEach((el, i) => {
        (el as HTMLElement).style.transitionDelay = `${(i % 4) * 0.08}s`;
        observer.observe(el);
      });
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
          className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 pb-24 pt-32 md:px-12 md:pb-32"
        >
          {/* SVG background lines */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <svg
              className="h-full w-full"
              viewBox="0 0 1440 900"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="100" y1="0" x2="400" y2="900" stroke="rgba(200,255,0,0.07)" strokeWidth="1" />
              <line x1="300" y1="0" x2="600" y2="900" stroke="rgba(200,255,0,0.05)" strokeWidth="1" />
              <line x1="900" y1="0" x2="1200" y2="900" stroke="rgba(200,255,0,0.04)" strokeWidth="1" />
              <line x1="1100" y1="0" x2="1400" y2="900" stroke="rgba(200,255,0,0.07)" strokeWidth="1" />
              <circle cx="1200" cy="200" r="300" stroke="rgba(200,255,0,0.03)" strokeWidth="1" fill="none" />
              <circle cx="1200" cy="200" r="200" stroke="rgba(200,255,0,0.05)" strokeWidth="1" fill="none" />
              <circle cx="1200" cy="200" r="100" stroke="rgba(200,255,0,0.03)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <div className="container relative z-10 mx-auto max-w-5xl">
            <p
              data-reveal
              className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-accent"
            >
              Web Developer
            </p>
            <h1
              data-reveal
              className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.04em]"
            >
              <span className="block">I build</span>
              <span className="block text-accent">digital</span>
              <span className="block">experiences.</span>
            </h1>
            <p
              data-reveal
              className="mt-4 font-display text-lg font-medium tracking-tight text-white/80"
            >
              Jimwel Cruz
            </p>
            <p
              data-reveal
              className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Full-stack developer and web team lead.{" "}
              <span className="sm:whitespace-nowrap">Clean code, bold design, no fluff.</span>
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            className="pointer-events-none absolute bottom-8 right-6 md:right-12"
            aria-hidden="true"
          >
            <span className="block h-20 w-px animate-scroll-line bg-gradient-to-b from-accent to-transparent" />
          </div>
        </section>

        {/* ============================================
            ABOUT
        ============================================ */}
        <section
          id="about"
          className="relative overflow-hidden bg-white px-6 py-32 md:px-12"
        >
          {/* Dot pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-100"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(10,10,10,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Geometric SVG */}
          <div
            className="pointer-events-none absolute -right-[5%] top-[10%] w-[clamp(250px,35vw,500px)] opacity-60"
            aria-hidden="true"
          >
            <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="50" width="500" height="500" stroke="rgba(10,10,10,0.1)" strokeWidth="1" fill="none" rx="4" />
              <rect x="100" y="100" width="400" height="400" stroke="rgba(10,10,10,0.06)" strokeWidth="1" fill="none" rx="4" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="rgba(10,10,10,0.08)" strokeWidth="1" />
              <line x1="550" y1="50" x2="500" y2="100" stroke="rgba(10,10,10,0.08)" strokeWidth="1" />
              <line x1="50" y1="550" x2="100" y2="500" stroke="rgba(10,10,10,0.08)" strokeWidth="1" />
              <line x1="550" y1="550" x2="500" y2="500" stroke="rgba(10,10,10,0.08)" strokeWidth="1" />
              <circle cx="300" cy="300" r="150" stroke="rgba(10,10,10,0.05)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl text-black">
            <p
              data-reveal
              className="mb-8 text-xs font-medium uppercase tracking-[0.12em] text-black/35"
            >
              01 / About
            </p>
            <h2
              data-reveal
              className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.03em]"
            >
              I&apos;m a web developer who cares about the details — code quality,
              visual precision, and interfaces that actually work for people.
            </h2>
            <div data-reveal className="mt-8 flex max-w-xl flex-col gap-5">
              <p className="text-base leading-[1.7] text-black/55">
                Based in the Philippines. I spend my time building responsive,
                accessible websites and web applications that feel intentional —
                not assembled from templates.
              </p>
              <p className="text-base leading-[1.7] text-black/55">
                Every project is a chance to solve a real problem with clean
                architecture and thoughtful design. I believe the best interfaces
                are the ones you don&apos;t notice — they just work.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            WORK
        ============================================ */}
        <section id="work" className="bg-[#141414] px-6 py-32 md:px-12">
          <div className="container mx-auto">
            <p
              data-reveal
              className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-white/35"
            >
              02 / Work
            </p>
            <h2
              data-reveal
              className="mb-20 font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white"
            >
              Selected
              <br />
              Projects
            </h2>

            <div className="flex flex-col gap-24">
              {projects.map((project, i) => (
                <article
                  key={project.title}
                  data-reveal
                  className={`grid gap-8 md:gap-16 ${
                    i % 2 === 0
                      ? "md:grid-cols-[1.2fr_1fr]"
                      : "md:grid-cols-[1fr_1.2fr]"
                  } items-center`}
                >
                  {/* Image / Video */}
                  <div
                    className={`overflow-hidden rounded ${
                      i % 2 !== 0 ? "md:order-2" : ""
                    }`}
                  >
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block aspect-video cursor-pointer overflow-hidden bg-[#1c1c1c]"
                    >
                      {"video" in project && project.video ? (
                        <video
                          src={project.video}
                          loop
                          muted
                          playsInline
                          preload="none"
                          poster={project.image}
                          title={`${project.title} — ${project.description}`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={`${project.title} — ${project.description}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={project.priority === true}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </Link>
                  </div>

                  {/* Info */}
                  <div
                    className={`relative py-4 ${
                      i % 2 !== 0 ? "md:order-1" : ""
                    }`}
                  >
                    <span
                      className="pointer-events-none absolute -top-6 -left-2 font-display text-[clamp(4rem,8vw,7rem)] font-bold leading-none text-white/[0.04]"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="relative z-10 font-display text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold tracking-[-0.02em] text-white">
                      {project.title}
                    </h3>
                    <p className="relative z-10 mt-3 max-w-md text-sm leading-relaxed text-white/45">
                      {project.description}
                    </p>
                    <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-accent/20 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.06em] text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            SKILLS
        ============================================ */}
        <section id="skills" className="relative overflow-hidden bg-background px-6 py-32 md:px-12">
          {/* Flowing SVG */}
          <div
            className="pointer-events-none absolute left-[5%] top-[5%] w-[clamp(80px,12vw,180px)] opacity-80"
            aria-hidden="true"
          >
            <svg viewBox="0 0 200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 0 C100 200, 180 300, 100 400 C20 500, 100 600, 100 800"
                stroke="rgba(200,255,0,0.1)"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="100" cy="400" r="60" stroke="rgba(200,255,0,0.06)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <div className="container relative z-10 mx-auto">
            <p
              data-reveal
              className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
            >
              03 / Skills
            </p>
            <h2
              data-reveal
              className="mb-16 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            >
              What I
              <br />
              Work With
            </h2>

            <div className="grid gap-12 md:grid-cols-3 md:gap-16">
              {skillGroups.map((group) => (
                <div data-reveal key={group.title}>
                  <h3 className="mb-6 border-b border-accent/15 pb-3 text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                    {group.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            AI-ASSISTED DEVELOPMENT
        ============================================ */}
        <section className="relative overflow-hidden bg-[#141414] px-6 py-32 md:px-12">
          {/* Subtle grid pattern */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="container relative z-10 mx-auto">
            <p
              data-reveal
              className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-white/35"
            >
              AI &amp; Tools
            </p>
            <h2
              data-reveal
              className="mb-6 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white"
            >
              Smarter With
              <br />
              <span className="text-accent">AI</span>
            </h2>
            <p
              data-reveal
              className="mb-16 max-w-lg text-base leading-relaxed text-white/45"
            >
              I leverage AI agents and modern AI-powered tools to write better code, faster.
              Here&apos;s how AI fits into my workflow.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {aiTools.map((tool) => (
                <div
                  data-reveal
                  key={tool.title}
                  className="group border border-white/5 bg-white/[0.02] p-8 transition-colors hover:border-accent/30"
                >
                  <tool.icon
                    className="mb-5 text-accent transition-transform group-hover:scale-110"
                    size={22}
                  />
                  <h3 className="font-display text-base font-semibold tracking-tight text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            STATS
        ============================================ */}
        <section className="relative overflow-hidden bg-[#1c1c1c] px-6 py-32 md:px-12">
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="container relative z-10 mx-auto grid grid-cols-2 gap-12 md:grid-cols-4">
            {[
              {
                number: `${new Date().getFullYear() - START_YEAR}+`,
                label: "Years Building",
              },
              {
                number: `${projects.length}+`,
                label: "Projects Shipped",
              },
              { number: "10+", label: "Technologies" },
              { number: "100%", label: "Responsive" },
            ].map((stat) => (
              <div data-reveal key={stat.label} className="flex flex-col gap-2">
                <span className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.04em] text-accent">
                  {stat.number}
                </span>
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/35">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================
            SERVICES
        ============================================ */}
        <section className="bg-background px-6 py-32 md:px-12">
          <div className="container mx-auto">
            <p
              data-reveal
              className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
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
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            FAQ
        ============================================ */}
        <section className="bg-[#141414] px-6 py-32 md:px-12">
          <div className="container mx-auto max-w-3xl">
            <h2
              data-reveal
              className="mb-12 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white"
            >
              Frequently asked questions.
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <details
                  data-reveal
                  key={faq.question}
                  className="group border border-white/5 bg-white/[0.02] p-6"
                >
                  <summary className="cursor-pointer text-base font-medium tracking-tight text-white outline-none">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            CONTACT
        ============================================ */}
        <section
          id="contact"
          className="relative overflow-hidden bg-off-white px-6 py-32 md:px-12"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          {/* Concentric circles SVG */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 w-[clamp(400px,60vw,800px)] -translate-x-1/2 -translate-y-1/2 opacity-50"
            aria-hidden="true"
          >
            <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="400" cy="300" r="250" stroke="rgba(10,10,10,0.07)" strokeWidth="1" fill="none" />
              <circle cx="400" cy="300" r="180" stroke="rgba(10,10,10,0.05)" strokeWidth="1" fill="none" />
              <circle cx="400" cy="300" r="110" stroke="rgba(10,10,10,0.03)" strokeWidth="1" fill="none" />
              <line x1="150" y1="300" x2="650" y2="300" stroke="rgba(10,10,10,0.04)" strokeWidth="1" />
              <line x1="400" y1="50" x2="400" y2="550" stroke="rgba(10,10,10,0.04)" strokeWidth="1" />
            </svg>
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl text-black">
            <p
              data-reveal
              className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-black/35"
            >
              05 / Contact
            </p>
            <h2
              data-reveal
              className="font-display text-[clamp(2.2rem,6.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            >
              Let&apos;s build
              <br />
              something{" "}
              <span className="relative inline-block">
                great.
                <span className="absolute bottom-[0.1em] left-0 right-0 -z-10 h-[0.35em] bg-accent" />
              </span>
            </h2>
            <Link
              data-reveal
              href="mailto:jimwelscruz0406@gmail.com"
              className="mt-10 inline-flex items-center gap-2 border-2 border-black px-4 py-2.5 text-xs font-semibold transition-colors hover:bg-black hover:text-[#f0f0f0] sm:gap-3 sm:px-8 sm:py-4 sm:text-base"
            >
              <span className="whitespace-nowrap">
                jimwelscruz0406@gmail.com
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
