import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9]">
      <AppHeader />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="bg-white border border-[#E4E7EB] rounded-2xl p-8 sm:p-12 max-w-md w-full shadow-sm space-y-6">
          <div className="inline-block text-5xl sm:text-6xl font-extrabold text-[#111318] tracking-tight font-mono">
            404
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#111318] tracking-tight">
              Aplikasi Tidak Ditemukan
            </h1>
            <p className="text-sm text-[#68707D] mt-2 leading-relaxed">
              Aplikasi yang Anda cari tidak ada atau telah dipindahkan.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#111318] text-white font-medium text-sm hover:-translate-y-0.5 transition-transform duration-150 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke portal unduhan</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E4E7EB] py-6 bg-white text-center text-xs text-[#68707D]">
        <div className="max-w-5xl mx-auto px-4">
          Portal Unduhan Direkt Resmi
        </div>
      </footer>
    </div>
  );
}
