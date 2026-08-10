"use client";

import { useEffect, useState } from "react";
import { Smartphone, Apple, Monitor } from "lucide-react";

interface PlatformBadgeProps {
  platform?: string;
}

export default function PlatformBadge({ platform = "Android" }: PlatformBadgeProps) {
  const [os, setOs] = useState<"android" | "ios" | "other" | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/android/i.test(ua)) {
      setOs("android");
    } else if (/iphone|ipad|ipod/i.test(ua)) {
      setOs("ios");
    } else {
      setOs("other");
    }
  }, []);

  if (os === null) return null;

  const isIosApp = /ios|iphone|ipad/i.test(platform);
  const isAndroidApp = /android/i.test(platform);

  return (
    <div className="inline-flex items-center gap-2 text-xs font-medium text-[#68707D] bg-white px-3 py-1.5 rounded-full border border-[#E4E7EB] shadow-2xs">
      {isIosApp ? (
        <Apple className="w-3.5 h-3.5 text-[#111318]" />
      ) : isAndroidApp ? (
        <Smartphone className="w-3.5 h-3.5 text-[#111318]" />
      ) : (
        <Monitor className="w-3.5 h-3.5 text-[#111318]" />
      )}
      <span>Aplikasi {platform}</span>
    </div>
  );
}
