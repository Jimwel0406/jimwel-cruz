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
  Briefcase,
  GraduationCap,
  Users,
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
          className="night-sky relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 pb-24 pt-32 md:px-12 md:pb-32"
        >
          {/* CSS Sky gradient */}
          <div className="sky-gradient absolute inset-0 z-0" aria-hidden="true" />

          {/* CSS Nebula */}
          <div className="nebula absolute inset-0 z-0" aria-hidden="true" />

          {/* CSS Cloud haze */}
          <div className="cloud-haze absolute inset-0 z-0" aria-hidden="true" />

          {/* Canvas — Stars, Meteors, Trails, Glow, Particles */}
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

              // --- Meteors ---
              const meteors: {
                x: number;
                y: number;
                speed: number;
                angle: number;
                opacity: number;
                life: number;
                maxLife: number;
                trail: { x: number; y: number }[];
              }[] = [];

              // --- Fog wisps — organic multi-blob clouds ---
              const fogWisps: {
                x: number;
                y: number;
                baseWidth: number;
                baseHeight: number;
                speed: number;
                opacity: number;
                phase: number;
                blobs: { ox: number; oy: number; rw: number; rh: number; alpha: number }[];
              }[] = [];
              const FOG_COUNT = 10;
              for (let i = 0; i < FOG_COUNT; i++) {
                const bw = 180 + Math.random() * 350;
                const bh = 25 + Math.random() * 40;
                // each cloud is 4-7 overlapping blobs for organic shape
                const blobCount = 4 + Math.floor(Math.random() * 4);
                const blobs = [];
                for (let b = 0; b < blobCount; b++) {
                  blobs.push({
                    ox: (Math.random() - 0.5) * bw * 0.7,
                    oy: (Math.random() - 0.5) * bh * 0.8,
                    rw: bw * (0.3 + Math.random() * 0.4),
                    rh: bh * (0.5 + Math.random() * 0.6),
                    alpha: 0.4 + Math.random() * 0.5,
                  });
                }
                fogWisps.push({
                  x: Math.random() * w,
                  y: h * 0.72 + Math.random() * h * 0.22,
                  baseWidth: bw,
                  baseHeight: bh,
                  speed: 0.15 + Math.random() * 0.3,
                  opacity: 0.025 + Math.random() * 0.04,
                  phase: Math.random() * Math.PI * 2,
                  blobs,
                });
              }

              let nextSpawnAt = 60 + Math.random() * 120;
              const spawnMeteor = () => {
                const angle = (Math.PI / 180) * (25 + Math.random() * 20);
                const maxLife = 80 + Math.random() * 60;
                meteors.push({
                  x: Math.random() * w * 0.7 + w * 0.1,
                  y: -10,
                  speed: 8 + Math.random() * 6,
                  angle,
                  opacity: 0.8 + Math.random() * 0.2,
                  life: 0,
                  maxLife,
                  trail: [],
                });
                // random delay: sometimes quick burst, sometimes long quiet pause
                const roll = Math.random();
                if (roll < 0.15) nextSpawnAt = time + 30 + Math.random() * 60;   // quick double
                else if (roll < 0.5) nextSpawnAt = time + 120 + Math.random() * 180; // normal
                else nextSpawnAt = time + 360 + Math.random() * 540;               // long pause
              };

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

                // Spawn meteors
                if (time > nextSpawnAt && meteors.length < 5) {
                  spawnMeteor();
                }

                // Draw meteors
                for (let i = meteors.length - 1; i >= 0; i--) {
                  const m = meteors[i];
                  if (!m) continue;
                  m.x += Math.cos(m.angle) * m.speed;
                  m.y += Math.sin(m.angle) * m.speed;
                  m.life++;

                  const lifeRatio = m.life / m.maxLife;
                  const fade = lifeRatio < 0.1 ? lifeRatio / 0.1 : lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1;
                  const currentOpacity = m.opacity * fade;

                  m.trail.push({ x: m.x, y: m.y });
                  if (m.trail.length > 40) m.trail.shift();

                  // Trail
                  for (let t = 0; t < m.trail.length; t++) {
                    const p = m.trail[t];
                    if (!p) continue;
                    const progress = t / m.trail.length;
                    const trailAlpha = progress * currentOpacity * 0.5;
                    const size = progress * 2;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(200,255,0,${trailAlpha})`;
                    ctx.fill();
                  }

                  // Glow — pulsing scale in/out
                  const pulse = Math.sin(m.life * 0.15) * 0.35 + 1;
                  const glowR = 14 * pulse;
                  const grd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, glowR);
                  grd.addColorStop(0, `rgba(255,255,255,${currentOpacity})`);
                  grd.addColorStop(0.3, `rgba(200,255,0,${currentOpacity * 0.5})`);
                  grd.addColorStop(1, "rgba(200,255,0,0)");
                  ctx.beginPath();
                  ctx.arc(m.x, m.y, glowR, 0, Math.PI * 2);
                  ctx.fillStyle = grd;
                  ctx.fill();

                  // Head — pulsing scale in/out
                  const headR = 2 * pulse;
                  ctx.beginPath();
                  ctx.arc(m.x, m.y, headR, 0, Math.PI * 2);
                  ctx.fillStyle = `rgba(255,255,255,${currentOpacity})`;
                  ctx.fill();

                  if (m.life > m.maxLife || m.x > w + 100 || m.y > h + 100) {
                    meteors.splice(i, 1);
                  }
                }

                // Draw fog wisps — overlapping organic blobs
                for (const f of fogWisps) {
                  f.x += f.speed;
                  f.phase += 0.004;
                  if (f.x - f.baseWidth > w) f.x = -f.baseWidth;

                  const yDrift = Math.sin(f.phase) * 6;
                  const currentOpacity = f.opacity * (0.6 + Math.sin(f.phase * 0.5) * 0.4);

                  for (const blob of f.blobs) {
                    const bx = f.x + blob.ox + Math.sin(f.phase + blob.ox) * 4;
                    const by = f.y + yDrift + blob.oy + Math.cos(f.phase * 0.7 + blob.oy) * 3;
                    const blobAlpha = currentOpacity * blob.alpha;

                    const grd = ctx.createRadialGradient(bx, by, 0, bx, by, blob.rw / 2);
                    grd.addColorStop(0, `rgba(160,170,200,${blobAlpha})`);
                    grd.addColorStop(0.3, `rgba(140,150,185,${blobAlpha * 0.7})`);
                    grd.addColorStop(0.6, `rgba(120,130,170,${blobAlpha * 0.3})`);
                    grd.addColorStop(1, `rgba(100,110,150,0)`);

                    ctx.beginPath();
                    ctx.ellipse(bx, by, blob.rw / 2, blob.rh / 2, 0, 0, Math.PI * 2);
                    ctx.fillStyle = grd;
                    ctx.fill();
                  }
                }

                requestAnimationFrame(draw);
              };

              requestAnimationFrame(draw);

              const onResize = () => {
                w = canvas.width = canvas.offsetWidth;
                h = canvas.height = canvas.offsetHeight;
                stars.forEach((s) => { s.x = Math.random() * w; s.y = Math.random() * h * 0.7; });
              };
              window.addEventListener("resize", onResize);
            }}
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
          />

          {/* Forest silhouette */}
          <div className="forest-silhouette absolute bottom-0 left-0 right-0 z-[2]" aria-hidden="true">
            <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
              <path d="M0 200V120L30 110L60 125L90 95L120 115L150 80L180 100L210 70L240 90L270 60L300 85L330 55L360 75L390 50L420 70L450 45L480 65L510 40L540 60L570 35L600 55L630 42L660 58L690 38L720 52L750 35L780 50L810 30L840 48L870 28L900 45L930 32L960 50L990 35L1020 52L1050 30L1080 48L1110 25L1140 42L1170 30L1200 48L1230 35L1260 55L1290 40L1320 60L1350 45L1380 65L1410 50L1440 70V200H0Z" fill="#050508"/>
              <path d="M0 200V140L40 132L80 145L120 120L160 138L200 105L240 125L280 95L320 115L360 85L400 108L440 78L480 100L520 72L560 92L600 65L640 85L680 60L720 80L760 55L800 75L840 50L880 70L920 48L960 68L1000 45L1040 65L1080 42L1120 62L1160 40L1200 58L1240 38L1280 55L1320 42L1360 60L1400 48L1440 65V200H0Z" fill="#080810"/>
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
            <p
              data-reveal
              className="mt-4 font-display text-lg font-medium tracking-tight text-white/80"
            >
              Jimwel Cruz
            </p>
            <p
              data-reveal
              className="mt-4 max-w-md text-lg font-bold leading-relaxed text-white md:text-xl"
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

          <div className="container relative z-10 mx-auto max-w-6xl text-black">
            <p
              data-reveal
              className="mb-8 text-sm font-bold uppercase tracking-[0.1em] text-black/60"
            >
              01 / About
            </p>

            <div className="grid gap-12 md:grid-cols-[1fr_0.4fr] md:gap-16">
              {/* Left — Main editorial block */}
              <div className="relative">
                {/* Decorative icons background */}
                <div className="pointer-events-none absolute -left-20 -top-16 -z-10 opacity-[0.04]" aria-hidden="true">
                  <Code2 size={140} strokeWidth={1} />
                </div>
                <div className="pointer-events-none absolute -right-28 top-8 -z-10 opacity-[0.04]" aria-hidden="true">
                  <Users size={120} strokeWidth={1} />
                </div>
                <div className="pointer-events-none absolute -bottom-10 right-0 -z-10 opacity-[0.04] md:right-20" aria-hidden="true">
                  <GraduationCap size={90} strokeWidth={1} />
                </div>

                <h2
                  data-reveal
                  className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em]"
                >
                  I&apos;m a web developer who builds things that work — and a
                  team lead who makes sure they ship.
                </h2>

                <div data-reveal className="relative mt-10 max-w-xl border-l-[6px] border-accent pl-6">
                  <p className="font-playfair text-xl font-medium leading-[1.8] text-black/70 md:text-2xl">
                    I&apos;m Jimwel Cruz. I started at{" "}
                    <span className="font-bold text-black">Sport Formula</span>{" "}
                    as a full stack web developer and got promoted to{" "}
                    <span className="font-bold text-black">
                      Web Dev Team Lead
                    </span>{" "}
                    after a year — because I can build and I can lead.
                  </p>
                </div>

                <div data-reveal className="relative mt-16 max-w-xl border-l-[6px] border-black/10 pl-6">
                  <div className="pointer-events-none absolute -left-14 top-1 -z-10 opacity-[0.06]" aria-hidden="true">
                    <Briefcase size={40} strokeWidth={1.5} />
                  </div>
                  <p className="font-playfair text-xl font-medium leading-[1.8] text-black/70 md:text-2xl">
                    Diploma graduate in Information Technology. I don&apos;t come
                    from a fancy university, but I&apos;ve spent{" "}
                    <span className="font-bold text-black">
                      3 years shipping real products
                    </span>
                    , managing a team, and solving problems that actually matter
                    to the business.
                  </p>
                </div>
              </div>

              {/* Right — Large name statement */}
              <div className="flex flex-col justify-end gap-8">
                <div data-reveal>
                  <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-black/50">
                    Based in
                  </span>
                  <span className="relative mt-2 inline-block font-display text-2xl font-bold tracking-[-0.02em] text-black">
                    The Philippines
                    <span className="absolute bottom-[0.05em] left-0 right-0 -z-10 h-[0.3em] bg-accent" />
                  </span>
                </div>
                <div data-reveal>
                  <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-black/50">
                    Focus
                  </span>
                  <span className="relative mt-2 inline-block font-display text-2xl font-bold tracking-[-0.02em] text-black">
                    Full Stack Web Dev
                    <span className="absolute bottom-[0.05em] left-0 right-0 -z-10 h-[0.3em] bg-accent" />
                  </span>
                </div>
                <div data-reveal>
                  <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-black/50">
                    Current Role
                  </span>
                  <span className="relative mt-2 inline-block font-display text-2xl font-bold tracking-[-0.02em] text-black">
                    Team Lead
                    <span className="absolute bottom-[0.05em] left-0 right-0 -z-10 h-[0.3em] bg-accent" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            TIMELINE
        ============================================ */}
        <section
          className="relative bg-[#f5f5f5] px-6 py-32 md:px-12"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            opacity: 1,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
          <div className="container mx-auto max-w-5xl">
            {/* Decorative frame */}
            <div className="relative border border-black/10 px-6 py-16 md:px-16 md:py-20">
              {/* Corner ornaments */}
              <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-black/20" />
              <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-black/20" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-black/20" />
              <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-black/20" />

              {/* Top decorative line */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-[#f5f5f5] px-4">
                <svg width="80" height="12" viewBox="0 0 80 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="6" x2="30" y2="6" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                  <circle cx="40" cy="6" r="3" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
                  <line x1="50" y1="6" x2="80" y2="6" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                </svg>
              </div>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#f5f5f5] px-4">
                <svg width="80" height="12" viewBox="0 0 80 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="6" x2="30" y2="6" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                  <circle cx="40" cy="6" r="3" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
                  <line x1="50" y1="6" x2="80" y2="6" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                </svg>
              </div>

              <p
                data-reveal
                className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-black/60"
              >
                02 / Journey
              </p>
              <h2
                data-reveal
                className="mb-20 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.04em] text-black"
              >
                Experience
                <br />
                &amp; Education
              </h2>

              <div className="flex flex-col">
                {/* Education */}
                <div
                  data-reveal
                  className="group flex flex-col gap-6 border-t-2 border-black py-10 md:flex-row md:items-start md:gap-16"
                >
                  <div className="shrink-0 md:w-48">
                    <span className="font-display text-sm font-bold uppercase tracking-[0.06em] text-black">
                      Foundation
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-black md:text-3xl">
                      Diploma in Information Technology
                    </h3>
                    <p className="font-playfair mt-4 text-lg font-medium leading-[1.7] text-black/60 md:text-xl">
                      High school graduate with a focus on IT. The foundation that
                      started everything.
                    </p>
                  </div>
                </div>

                {/* Sport Formula — Full Stack Developer */}
                <div
                  data-reveal
                  className="group flex flex-col gap-6 border-t border-black/10 py-10 md:flex-row md:items-start md:gap-16"
                >
                  <div className="shrink-0 md:w-48">
                    <span className="font-display text-sm font-bold uppercase tracking-[0.06em] text-black">
                      2023
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-black md:text-3xl">
                      Full Stack Web Developer
                    </h3>
                    <p className="mt-1 text-sm font-bold text-black/55">
                      Sport Formula
                    </p>
                    <p className="font-playfair mt-4 text-lg font-medium leading-[1.7] text-black/60 md:text-xl">
                      Hired to build and maintain web applications end-to-end.
                      Frontend, backend, databases — the whole stack.
                    </p>
                  </div>
                </div>

                {/* Sport Formula — Team Lead */}
                <div
                  data-reveal
                  className="group flex flex-col gap-6 border-t border-black/10 border-b-2 border-b-black py-10 md:flex-row md:items-start md:gap-16"
                >
                  <div className="shrink-0 md:w-48">
                    <span className="font-display text-sm font-bold uppercase tracking-[0.06em] text-black">
                      2024 — Present
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-black md:text-3xl">
                      Web Dev Team Lead
                    </h3>
                    <p className="mt-1 text-sm font-bold text-black/55">
                      Sport Formula
                    </p>
                    <p className="font-playfair mt-4 text-lg font-medium leading-[1.7] text-black/60 md:text-xl">
                      Leading a team of developers. Overseeing website architecture,
                      code quality, and delivery. Still building — just with more
                      responsibility.
                    </p>
                  </div>
                </div>
              </div>
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
              className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-white/60"
            >
              03 / Work
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
                    <p className="relative z-10 mt-3 max-w-md text-sm font-medium leading-relaxed text-white/70">
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
              className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-foreground"
            >
              04 / Skills
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
                        className="text-sm font-medium text-white/70 transition-colors hover:text-white"
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
              className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-white/60"
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
              className="mb-16 max-w-lg text-lg font-medium leading-relaxed text-white/70"
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
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white/70">
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
                <span className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white/60">
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
              className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-foreground"
            >
              05 / Services
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
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white/70">
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
              className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-black/60"
            >
              06 / Contact
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
