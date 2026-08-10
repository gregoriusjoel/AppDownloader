export interface AppConfig {
  slug: string;
  name: string;
  description: string;
  version: string;
  size: string;
  platform: string;
  developer: string;
  icon?: string;
  downloadUrl: string;
  updatedAt?: string;
}

export function extractGitHubOwner(url: string): string {
  try {
    const match = url.match(/github\.com\/([^\/]+)/i);
    return match ? match[1] : "";
  } catch {
    return "";
  }
}

export const APPS: Record<string, AppConfig> = {
  atq: {
    slug: "atq",
    name: "ATQ",
    description: "Aplikasi mobile resmi ATQ untuk manajemen lapangan dan operasional cepat.",
    version: "1.2.2",
    size: "89.9 MB",
    platform: "Android",
    developer: "gregoriusjoel",
    icon: "/apps/atq/logo/ATQ.png",
    downloadUrl: "https://github.com/gregoriusjoel/ptpn/releases/download/ATQ/atq_v.1.2.2.apk",
    updatedAt: "2026-08-10",
  },
};

export function getAppBySlug(slug: string): AppConfig | undefined {
  const app = APPS[slug.toLowerCase()];
  if (app && (!app.developer || app.developer.trim() === "")) {
    app.developer = extractGitHubOwner(app.downloadUrl) || "gregoriusjoel";
  }
  return app;
}

export function getAllAppSlugs(): string[] {
  return Object.keys(APPS);
}

export function getAllApps(): AppConfig[] {
  return Object.values(APPS).map((app) => ({
    ...app,
    developer: app.developer || extractGitHubOwner(app.downloadUrl) || "gregoriusjoel",
  }));
}
