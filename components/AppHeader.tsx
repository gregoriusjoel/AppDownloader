import Link from "next/link";
import { ShieldCheck } from "lucide-react";

interface AppHeaderProps {
  showHomeLink?: boolean;
}

export default function AppHeader({ showHomeLink = false }: AppHeaderProps) {
  return (
    <header className="w-full border-b border-[#E4E7EB] bg-[#FFFFFF]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {showHomeLink ? (
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-80"
          >
            <div className="w-8 h-8 rounded-lg bg-[#111318] flex items-center justify-center text-white font-bold text-sm tracking-tighter">
              AP
            </div>
            <span className="font-semibold text-[#111318] text-base tracking-tight">
              AppPortal
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-2.5 select-none">
            <div className="w-8 h-8 rounded-lg bg-[#111318] flex items-center justify-center text-white font-bold text-sm tracking-tighter">
              AP
            </div>
            <span className="font-semibold text-[#111318] text-base tracking-tight">
              AppPortal
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs font-medium text-[#68707D] bg-[#F6F7F9] px-3 py-1.5 rounded-full border border-[#E4E7EB]">
          <ShieldCheck className="w-4 h-4 text-[#111318]" />
          <span>Unduhan Direct Resmi</span>
        </div>
      </div>
    </header>
  );
}
