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
    downloadUrl: "https://github.com/gregoriusjoel/AppDownloader/releases/download/ATQ/atq_v.1.2.2.apk",
    updatedAt: "2026-08-10",
  },
  ptpn: {
    slug: "ptpn",
    name: "PTPN",
    description: "Aplikasi mobile resmi PTPN untuk manajemen dan operasional.",
    version: "1.1.10",
    size: "42.1 MB",
    platform: "Android",
    developer: "gregoriusjoel",
    icon: "/apps/ptpn/ptpn-logo.png",
    downloadUrl: "https://github.com/gregoriusjoel/AppDownloader/releases/download/PTPN-v1.1.10/SIAGA.v1.1.10.apk",
    updatedAt: "2026-10-12",
  },
  renhan: {
    slug: "renhan",
    name: "E-Absensi",
    description: "Aplikasi mobile resmi E-Absensi Renhan untuk pencatatan kehadiran dan manajemen absensi pegawai.",
    version: "2.0.0",
    size: "81.9 MB",
    platform: "Android",
    developer: "gregoriusjoel",
    icon: "/apps/renhan/renhan-logo.png",
    downloadUrl: "https://github.com/gregoriusjoel/AppDownloader/releases/download/E-Absensi-v2.0.0/v2.0.0.apk",
    updatedAt: "2026-09-08",
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
