/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || "https://jimwel-cruz.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/404"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://jimwel-cruz.vercel.app/sitemap.xml",
    ],
  },
};
