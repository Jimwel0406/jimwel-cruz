import Link from "next/link";
import Seo from "@/components/Seo";
import { SITE, siteGraph } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useLenis } from "lenis/react";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

const navLinks = [
  { href: "#about", text: "About" },
  { href: "#work", text: "Work" },
  { href: "#contact", text: "Contact" },
];

export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"blend" | "light" | "dark">("blend");
  const navRef = useRef<HTMLElement | null>(null);
  const transitionTimers = useRef<number[]>([]);
  const lenis = useLenis();
  const navOnLight = navTheme === "light" && !isOpen;

  const { children, title, description } = props;
  const router = useRouter();

  // close menu on route change
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // swap nav colouring when it sits over an explicitly themed band
  // (mix-blend-difference inverts to odd hues over light surfaces)
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const x = window.innerWidth / 2;
      const y = nav.getBoundingClientRect().height / 2;
      let theme: "blend" | "light" | "dark" = "blend";

      for (const el of document.elementsFromPoint(x, y)) {
        if (nav.contains(el)) continue;
        const band = el.closest<HTMLElement>("[data-nav-theme]");
        if (band) {
          theme = band.dataset.navTheme === "dark" ? "dark" : "light";
          break;
        }
      }

      setNavTheme(theme);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // drop pending transition timers if we unmount mid-fade
  useEffect(() => {
    const timers = transitionTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  // fade-to-dark transition shared by every section link
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const overlay = document.getElementById("page-transition");
    const target = document.querySelector(href);
    if (!overlay || !target) return;

    // cancel any fade still in flight so only the latest click lands
    transitionTimers.current.forEach(clearTimeout);
    transitionTimers.current = [];

    const root = document.documentElement;
    root.style.scrollBehavior = "auto";

    overlay.style.opacity = "1";
    root.classList.add("is-page-fading");

    const scrollTimer = window.setTimeout(() => {
      const top = target.getBoundingClientRect().top + window.scrollY;
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo({ top, behavior: "auto" });
      history.replaceState(null, "", href);
      root.style.scrollBehavior = "";

      const fadeTimer = window.setTimeout(() => {
        overlay.style.opacity = "0";
        root.classList.remove("is-page-fading");
      }, 80);
      transitionTimers.current.push(fadeTimer);
    }, 700);
    transitionTimers.current.push(scrollTimer);
  };

  return (
    <>
      <Seo
        title={title ?? SITE.title}
        description={description ?? SITE.description}
        jsonLd={siteGraph}
      />

      {/* Page transition overlay (section nav) */}
      <div
        id="page-transition"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] bg-[#0a0a0a] opacity-0 transition-opacity duration-700 ease-in-out"
      />

      {/* Skip link */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12",
          isOpen
            ? "bg-[#0a0a0a]"
            : navTheme === "blend"
              ? "mix-blend-difference"
              : ""
        )}
      >
        <Link
          href="/"
          className={cn(
            "font-display font-bold tracking-tight",
            navOnLight ? "text-black" : "text-white"
          )}
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          J.
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "text-sm font-medium uppercase tracking-[0.06em] transition-colors duration-200",
                  navOnLight
                    ? "text-black hover:text-black/60"
                    : "text-white hover:text-accent"
                )}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex flex-col gap-[5px] md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span
            className={cn(
              "block h-[2px] w-7 transition-transform duration-300",
              isOpen || !navOnLight ? "bg-white" : "bg-black",
              isOpen && "translate-y-[4px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-7 transition-transform duration-300",
              isOpen || !navOnLight ? "bg-white" : "bg-black",
              isOpen && "-translate-y-[4px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={isOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-[#141414] px-8 transition-transform duration-400 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setIsOpen(false);
                }}
                className="font-display text-3xl font-semibold tracking-tight text-white transition-colors hover:text-accent"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
