"use client";

import { Download } from "lucide-react";

interface DownloadButtonProps {
  downloadUrl: string;
  appName: string;
  buttonText?: string;
}

export default function DownloadButton({
  downloadUrl,
  appName,
  buttonText,
}: DownloadButtonProps) {
  const handleDownload = () => {
    window.location.href = downloadUrl;
  };

  const label =
    buttonText ||
    (downloadUrl.toLowerCase().endsWith(".apk") ? "Download APK" : "Download App");

  return (
    <div className="w-full">
      <a
        href={downloadUrl}
        onClick={handleDownload}
        className="w-full sm:w-auto min-w-[240px] h-14 px-8 rounded-full bg-[#111318] text-white font-semibold text-base flex items-center justify-center gap-3 shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-[#111318] focus:ring-offset-2 select-none"
        aria-label={`${label} for ${appName}`}
      >
        <Download className="w-5 h-5 text-white stroke-[2.2]" />
        <span>{label}</span>
      </a>
    </div>
  );
}
