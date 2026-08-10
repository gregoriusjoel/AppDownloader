import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppBySlug, getAllAppSlugs, extractGitHubOwner } from "@/data/apps";
import AppHeader from "@/components/AppHeader";
import AppIcon from "@/components/AppIcon";
import DownloadButton from "@/components/DownloadButton";
import InstallationGuide from "@/components/InstallationGuide";
import PlatformBadge from "@/components/PlatformBadge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllAppSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    return {
      title: "Aplikasi Tidak Ditemukan",
      description: "Aplikasi yang diakses tidak ditemukan.",
    };
  }

  return {
    title: `Unduh ${app.name} – Aplikasi ${app.platform}`,
    description: `Unduh versi terbaru ${app.name} (${app.version}) untuk ${app.platform}. Portal unduhan langsung resmi.`,
    openGraph: {
      title: `Unduh ${app.name} – Aplikasi ${app.platform}`,
      description: app.description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Unduh ${app.name} – Aplikasi ${app.platform}`,
      description: app.description,
    },
  };
}

export default async function DownloadPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const githubOwner = extractGitHubOwner(app.downloadUrl) || app.developer;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9]">
      {/* Header dengan NO link ke root dashboard untuk pengguna umum */}
      <AppHeader showHomeLink={false} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Download Info Section */}
          <section className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* App Icon & Platform Status */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <AppIcon name={app.name} icon={app.icon} size="lg" />
              <div className="flex flex-col items-center sm:items-start gap-1">
                <PlatformBadge platform={app.platform} />
              </div>
            </div>

            {/* App Title & Description */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111318] tracking-tight leading-tight">
                {app.name}
              </h1>
              <p className="text-base sm:text-lg text-[#68707D] mt-3 max-w-xl leading-relaxed">
                {app.description}
              </p>
            </div>

            {/* Dynamic Metadata Pill Badges (Platform, Version, Size) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm font-medium text-[#68707D]">
              <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E4E7EB] text-[#111318]">
                {app.platform}
              </span>
              <span className="text-[#E4E7EB]">•</span>
              <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E4E7EB] text-[#111318]">
                v{app.version}
              </span>
              <span className="text-[#E4E7EB]">•</span>
              <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E4E7EB] text-[#111318]">
                {app.size}
              </span>
            </div>

            {/* Download Button CTA (Keep in English: Download APK) */}
            <div className="w-full pt-2">
              <DownloadButton downloadUrl={app.downloadUrl} appName={app.name} />
            </div>

            {/* Publisher Metadata (Keep in English: Published by) */}
            <div className="pt-2 text-xs text-[#68707D]">
              Published by{" "}
              <a
                href={`https://github.com/${githubOwner}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#111318] hover:underline"
              >
                {githubOwner}
              </a>
            </div>

          </section>

          {/* Right Column: Dynamic Installation Guide (Indonesian) */}
          <section className="lg:col-span-5 w-full">
            <InstallationGuide platform={app.platform} />
          </section>

        </div>
      </main>

      <footer className="border-t border-[#E4E7EB] py-6 bg-white text-center text-xs text-[#68707D] mt-auto">
        <div className="max-w-5xl mx-auto px-4">
          Portal Unduhan Direct Resmi
        </div>
      </footer>
    </div>
  );
}
