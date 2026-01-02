import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/signup"],
    },
    sitemap: "https://marghai.vercel.come/sitemap.xml",
  };
}
