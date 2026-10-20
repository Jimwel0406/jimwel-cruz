const siteUrl = process.env.SITE_URL || "https://jimwel-cruz.vercel.app";

const projectPaths = ["/projects/calculator", "/projects/mole-bash"];

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: ["/404", ...projectPaths],
  additionalPaths: async () =>
    projectPaths.map((path) => ({
      loc: path,
      changefreq: "monthly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    })),
  transform: async (_config, path) => ({
    loc: path,
    changefreq: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.6,
    lastmod: new Date().toISOString(),
  }),
};

export default config;
