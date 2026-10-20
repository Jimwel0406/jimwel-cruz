import Seo from "@/components/Seo";
import { SITE, absolute } from "@/lib/seo";

const description =
  "Mole Bash — a classic arcade-style whack-a-mole game with score tracking and responsive controls, built by Jimwel Cruz.";

export default function MoleBash() {
  return (
    <>
      <Seo
        title="Mole Bash — Jimwel Cruz"
        description={description}
        path="/projects/mole-bash"
        type="article"
        jsonLd={[
          {
            "@type": "WebApplication",
            "@id": `${SITE.url}/projects/mole-bash#app`,
            name: "Mole Bash",
            url: absolute("/projects/mole-bash"),
            description,
            applicationCategory: "GameApplication",
            genre: "Arcade",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript",
            author: { "@id": `${SITE.url}/#person` },
            isPartOf: { "@id": `${SITE.url}/#website` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${SITE.url}/projects/mole-bash#breadcrumb`,
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
                name: "Mole Bash",
                item: absolute("/projects/mole-bash"),
              },
            ],
          },
        ]}
      />
      <main className="h-screen w-full bg-background">
        <iframe
          src="/projects/mole-bash/index.html"
          title="Mole Bash"
          className="h-full w-full border-0"
        />
      </main>
    </>
  );
}
