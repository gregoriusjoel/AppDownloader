"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllApps } from "@/data/apps";
import AppHeader from "@/components/AppHeader";
import AppIcon from "@/components/AppIcon";
import QRCodeModal from "@/components/QRCodeModal";
import { Download, ChevronRight, Lock, Unlock, KeyRound, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  const apps = getAllApps();
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);

  const ADMIN_PIN = "2816";

  useEffect(() => {
    // Check if unlocked via localStorage or URL query parameter
    const storedAuth = localStorage.getItem("portal_admin_unlocked");
    const params = new URLSearchParams(window.location.search);
    const pinParam = params.get("pin");
    const keyParam = params.get("key");

    if (storedAuth === "true" || pinParam === ADMIN_PIN || keyParam === "admin") {
      setIsUnlocked(true);
      localStorage.setItem("portal_admin_unlocked", "true");
    } else {
      setIsUnlocked(false);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsUnlocked(true);
      localStorage.setItem("portal_admin_unlocked", "true");
      setShowPinModal(false);
      setErrorMsg("");
    } else {
      setErrorMsg("PIN salah. Akses ditolak.");
    }
  };

  const handleLock = () => {
    localStorage.removeItem("portal_admin_unlocked");
    setIsUnlocked(false);
  };

  if (isUnlocked === null) {
    return <div className="min-h-screen bg-[#F6F7F9]" />;
  }

  // Jika dikunci: tampilkan layar Akses Dibatasi untuk pengguna umum
  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F6F7F9]">
        <AppHeader showHomeLink={false} />

        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-8 sm:p-12 max-w-md w-full shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#F6F7F9] border border-[#E4E7EB] flex items-center justify-center mx-auto text-[#111318]">
              <Lock className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#111318] tracking-tight">
                Akses Langsung Dibatasi
              </h1>
              <p className="text-sm text-[#68707D] mt-2 leading-relaxed">
                Portal ini mendistribusikan unduhan aplikasi melalui tautan langsung. Gunakan tautan unduh atau kode QR resmi aplikasi Anda.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowPinModal(true)}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#68707D] hover:text-[#111318] transition-colors py-2 px-4 rounded-full border border-[#E4E7EB] bg-white hover:bg-gray-50"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Login Admin</span>
              </button>
            </div>
          </div>
        </main>

        {/* PIN Entry Modal untuk Pengelola */}
        {showPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-xl border border-[#E4E7EB] text-center">
              <h3 className="text-lg font-bold text-[#111318]">PIN Admin Diperlukan</h3>
              <p className="text-xs text-[#68707D] mt-1 mb-4">
                Masukkan PIN untuk mengakses dashboard.
              </p>

              <form onSubmit={handleUnlock} className="space-y-4">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Masukkan PIN"
                  className="w-full h-11 px-4 text-center text-lg tracking-widest rounded-xl border border-[#E4E7EB] focus:outline-none focus:ring-2 focus:ring-[#111318]"
                  autoFocus
                />

                {errorMsg && (
                  <p className="text-xs text-red-600 font-medium flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPinModal(false);
                      setErrorMsg("");
                    }}
                    className="flex-1 h-10 rounded-xl border border-[#E4E7EB] text-xs font-semibold text-[#68707D] hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-[#111318] text-white text-xs font-semibold hover:bg-black"
                  >
                    Buka
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="border-t border-[#E4E7EB] py-6 bg-white text-center text-xs text-[#68707D]">
          <div className="max-w-5xl mx-auto px-4">
            Layanan Unduhan Aplikasi Resmi
          </div>
        </footer>
      </div>
    );
  }

  // DASHBOARD ADMIN UNTUK PENGELOLA
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9]">
      <AppHeader showHomeLink={true} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        {/* Header Hero Section */}
        <section className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-between gap-4 w-full sm:w-auto px-4 py-2 rounded-full bg-white border border-[#E4E7EB] text-xs font-medium text-[#68707D] mb-6 shadow-2xs">
            <div className="flex items-center gap-2">
              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[#111318] font-semibold">Dashboard Admin Terbuka</span>
            </div>
            <button
              onClick={handleLock}
              className="text-xs text-red-600 hover:underline font-medium ml-2"
            >
              Kunci Portal
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#111318] tracking-tight leading-tight">
            Pengelola Unduhan Aplikasi
          </h1>
          <p className="text-base sm:text-lg text-[#68707D] mt-3 leading-relaxed">
            Kelola tautan aplikasi dan buat Kode QR untuk publikasi.
          </p>
        </section>

        {/* Apps Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.slug}
              className="bg-white border border-[#E4E7EB] rounded-2xl p-6 flex flex-col justify-between hover:border-[#111318]/20 transition-all duration-200 shadow-2xs group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <AppIcon name={app.name} icon={app.icon} size="md" />
                  <QRCodeModal slug={app.slug} appName={app.name} />
                </div>

                <h2 className="text-xl font-bold text-[#111318] tracking-tight group-hover:text-black transition-colors">
                  {app.name}
                </h2>

                <p className="text-xs text-[#68707D] mt-2 line-clamp-2 leading-relaxed">
                  {app.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-medium text-[#68707D] mt-4">
                  <span className="bg-[#F6F7F9] px-2.5 py-1 rounded-md border border-[#E4E7EB]">
                    v{app.version}
                  </span>
                  <span>•</span>
                  <span>{app.size}</span>
                  <span>•</span>
                  <span>{app.platform}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E4E7EB] flex items-center justify-between gap-3">
                <Link
                  href={`/download/${app.slug}`}
                  className="flex-1 h-10 px-4 rounded-xl bg-[#111318] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform duration-150"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Preview Halaman</span>
                </Link>

                <Link
                  href={`/download/${app.slug}`}
                  className="w-10 h-10 rounded-xl border border-[#E4E7EB] bg-[#F6F7F9] text-[#111318] flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label={`Lihat detail untuk ${app.name}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </section>

      </main>

      <footer className="border-t border-[#E4E7EB] py-6 bg-white text-center text-xs text-[#68707D]">
        <div className="max-w-5xl mx-auto px-4">
          AppPortal • Tampilan Admin
        </div>
      </footer>
    </div>
  );
}
