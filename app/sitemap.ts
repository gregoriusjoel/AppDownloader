import { MetadataRoute } from "next";
import { getAllApps } from "@/data/apps";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://download.example.com";
  const apps = getAllApps();

  const appUrls = apps.map((app) => ({
    url: `${baseUrl}/download/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...appUrls,
  ];
}
