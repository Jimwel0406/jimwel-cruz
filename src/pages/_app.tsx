import { useEffect } from "react";
import { type AppType } from "next/dist/shared/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactLenis } from "lenis/react";

import "@/styles/globals.css";

import { Fraunces, Inter, Noto_Serif } from "next/font/google";

const fraunces = Fraunces({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const notoSerif = Noto_Serif({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const SCROLL_KEY = "scroll-position";

// Keeps the scroll position across a reload. The browser can't do this here:
// the page grows after first paint, so the restore lands too early. Instead,
// the position is saved as the user scrolls and restored in short retries
// until the page is tall enough. Only reloads restore; normal visits don't.
function ScrollMemory() {
  useEffect(() => {
    try {
      history.scrollRestoration = "manual";
    } catch {
      // older browsers: nothing to do
    }

    const save = () => {
      try {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      } catch {
        // storage can be blocked; the page still works without it
      }
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(save);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);

    // stop restoring as soon as the visitor scrolls by hand
    let timer = 0;
    let stopped = false;
    const stop = () => {
      stopped = true;
      window.clearTimeout(timer);
    };
    const userEvents = ["wheel", "touchstart", "keydown"] as const;
    userEvents.forEach((name) =>
      window.addEventListener(name, stop, { passive: true })
    );

    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type === "reload") {
      let target = 0;
      try {
        target = Number(sessionStorage.getItem(SCROLL_KEY)) || 0;
      } catch {
        target = 0;
      }
      let tries = 0;
      const html = document.documentElement;
      const attempt = () => {
        if (stopped) return;
        // the site sets smooth scrolling on <html>; turn it off for the jump
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, target);
        html.style.scrollBehavior = "";
        tries += 1;
        if (Math.abs(window.scrollY - target) <= 2 || tries >= 40) return;
        timer = window.setTimeout(attempt, 100);
      };
      if (target > 0) attempt();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", save);
      userEvents.forEach((name) => window.removeEventListener(name, stop));
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.08 }}>
      <ScrollMemory />
      <div className={`${fraunces.variable} ${inter.variable} ${notoSerif.variable} font-body`}>
        <Component {...pageProps} />
        <SpeedInsights />
      </div>
    </ReactLenis>
  );
};

export default MyApp;
