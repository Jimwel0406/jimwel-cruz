import Head from "next/head";
import { useRouter } from "next/router";

import { SITE, absolute } from "@/lib/seo";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "profile" | "article";
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const stripQueryAndHash = (path: string) => {
  const [cleanPath = "/"] = path.split(/[?#]/);
  return cleanPath;
};

export default function Seo({
  title = SITE.title,
  description = SITE.description,
  path,
  type = "website",
  image = SITE.ogImage,
  imageAlt = `${SITE.name} — ${SITE.role}`,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const router = useRouter();
  const canonical = absolute(stripQueryAndHash(path ?? router.asPath));
  const imageUrl = absolute(image);

  const payload = jsonLd
    ? Array.isArray(jsonLd)
      ? { "@context": "https://schema.org", "@graph": jsonLd }
      : jsonLd
    : null;

  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="author" content={SITE.name} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta
        name="google-site-verification"
        content="1NOtgswhSvGsOmHvaKS5oIdgFU2gaz81xG8E3EBK0GM"
      />
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="application-name" content={SITE.name} />
      <meta name="apple-mobile-web-app-title" content={SITE.name} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

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
      <link rel="apple-touch-icon" href="/icon-192x192.png" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={SITE.name}
        href={absolute("/feed.xml")}
      />

      {payload ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </Head>
  );
}
