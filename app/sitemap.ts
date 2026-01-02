import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://marghai.vercel.com";

  const staticPages = ["", "/jobs", "/login", "/signup", "/about", "/post"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  let jobPages: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(
      "https://marghai-backend.onrender.com/customer/jobs?limit=10000",
      {
        cache: "no-store",
      }
    );

    const jobs = await res.json();

    jobPages = jobs?.data?.map((job: any) => ({
      url: `${baseUrl}/jobs/${job.id}`,
      lastModified: new Date(job.updatedAt || job.createdAt),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));
  } catch (error) {}

  return [...staticPages, ...jobPages];
}
