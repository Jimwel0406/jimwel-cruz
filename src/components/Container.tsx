import Head from "next/head";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

const navLinks = [
  { href: "#about", text: "About" },
  { href: "#work", text: "Work" },
  { href: "#skills", text: "Skills" },
  { href: "#contact", text: "Contact" },
];

export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const siteUrl = "https://jimwel-cruz.vercel.app";
  const meta = {
    title: "Jimwel Cruz — Web Developer",
    description:
      "Full-stack developer and web team lead building performant, accessible digital experiences with React, Next.js, and Node.js.",
    image: `${siteUrl}/icon.jpg`,
    type: "website",
    ...customMeta,
  };

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

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta
          name="google-site-verification"
          content="1NOtgswhSvGsOmHvaKS5oIdgFU2gaz81xG8E3EBK0GM"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://jimwel-cruz.vercel.app${router.asPath}`} />
        <link rel="canonical" href={`https://jimwel-cruz.vercel.app${router.asPath}`} />
        <link rel="alternate" hrefLang="en" href={`https://jimwel-cruz.vercel.app${router.asPath}`} />
        <link rel="alternate" hrefLang="x-default" href="https://jimwel-cruz.vercel.app" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Jimwel Cruz" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Jimwel Cruz — Web Developer" />
        <meta property="og:locale" content="en_US" />
        <link
          rel="icon"
          href="/favicon-with-bg.ico"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon-without-bg.ico"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Jimwel Cruz"
          href={`${siteUrl}/feed.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: meta.title,
                  url: siteUrl,
                  description: meta.description,
                  inLanguage: "en",
                  publisher: { "@id": `${siteUrl}/#organization` },
                },
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "Jimwel Cruz",
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/assets/logo.webp`,
                  },
                  image: `${siteUrl}/assets/logo.webp`,
                  description: meta.description,
                  sameAs: [
                    "https://github.com/Jimwel0406",
                    "https://linkedin.com/in/jimwel-cruz",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "jimwelscruz0406@gmail.com",
                    url: `${siteUrl}/#contact`,
                    contactType: "sales",
                    availableLanguage: "English",
                  },
                },
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: "Jimwel Cruz",
                  url: siteUrl,
                  jobTitle: "Full-Stack Developer and Web Team Lead",
                  email: "mailto:jimwelscruz0406@gmail.com",
                  nationality: "Philippines",
                  sameAs: [
                    "https://github.com/Jimwel0406",
                    "https://linkedin.com/in/jimwel-cruz",
                  ],
                  worksFor: { "@id": `${siteUrl}/#organization` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </Head>

      {/* Skip link */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12",
          isOpen ? "bg-[#0a0a0a]" : "mix-blend-difference"
        )}
      >
        <Link
          href="/"
          className="font-display font-bold tracking-tight text-white"
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
                className={cn(
                  "text-sm font-medium uppercase tracking-[0.06em] transition-colors duration-200",
                  link.href === "#contact"
                    ? "text-accent"
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
              "block h-[2px] w-7 bg-white transition-transform duration-300",
              isOpen && "translate-y-[4px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-7 bg-white transition-transform duration-300",
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
                onClick={() => setIsOpen(false)}
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
