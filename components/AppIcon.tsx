"use client";

import { useState } from "react";
import Image from "next/image";

interface AppIconProps {
  name: string;
  icon?: string;
  size?: "md" | "lg";
}

export default function AppIcon({ name, icon, size = "lg" }: AppIconProps) {
  const [error, setError] = useState(false);

  const initial = name ? name.charAt(0).toUpperCase() : "A";
  const dimensionClass = size === "lg" ? "w-20 h-20 sm:w-24 sm:h-24" : "w-14 h-14";
  const fontSizeClass = size === "lg" ? "text-3xl sm:text-4xl" : "text-xl";

  if (!icon || error) {
    return (
      <div
        className={`${dimensionClass} rounded-[22px] bg-[#111318] text-white font-bold ${fontSizeClass} flex items-center justify-center shadow-md border border-[#E4E7EB] shrink-0 select-none`}
        aria-label={`${name} logo fallback`}
      >
        {initial}
      </div>
    );
  }

  return (
    <div className={`${dimensionClass} relative rounded-[22px] overflow-hidden shadow-md border border-[#E4E7EB] bg-white shrink-0`}>
      <Image
        src={icon}
        alt={`${name} icon`}
        fill
        sizes="(max-width: 640px) 80px, 96px"
        className="object-cover"
        onError={() => setError(true)}
        priority
      />
    </div>
  );
}
