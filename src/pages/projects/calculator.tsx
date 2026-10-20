import Seo from "@/components/Seo";
import { SITE, absolute } from "@/lib/seo";

const description =
  "A modern, responsive calculator app with keyboard support, built with vanilla JavaScript by Jimwel Cruz.";

export default function Calculator() {
  return (
    <>
      <Seo
        title="Calculator — Jimwel Cruz"
        description={description}
        path="/projects/calculator"
        type="article"
        jsonLd={[
          {
            "@type": "WebApplication",
            "@id": `${SITE.url}/projects/calculator#app`,
            name: "Calculator",
            url: absolute("/projects/calculator"),
            description,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript",
            author: { "@id": `${SITE.url}/#person` },
            isPartOf: { "@id": `${SITE.url}/#website` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${SITE.url}/projects/calculator#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Calculator",
                item: absolute("/projects/calculator"),
              },
            ],
          },
        ]}
      />
      <main className="h-screen w-full bg-background">
        <iframe
          src="/projects/calculator/index.html"
          title="Calculator"
          className="h-full w-full border-0"
        />
      </main>
    </>
  );
}
