"use client";

import { useState, useEffect } from "react";
import { QrCode, X, Copy, Check } from "lucide-react";

interface QRCodeModalProps {
  slug: string;
  appName: string;
}

export default function QRCodeModal({ slug, appName }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portalUrl, setPortalUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPortalUrl(`${window.location.origin}/download/${slug}`);
    }
  }, [slug]);

  const qrImageUrl = portalUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
        portalUrl
      )}&margin=10`
    : "";

  const handleCopy = async () => {
    if (!portalUrl) return;
    await navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-xs font-medium text-[#68707D] hover:text-[#111318] transition-colors py-1 px-2.5 rounded-lg border border-[#E4E7EB] bg-white shadow-2xs"
        aria-label={`Tampilkan Kode QR untuk ${appName}`}
      >
        <QrCode className="w-3.5 h-3.5" />
        <span>Kode QR</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-xl border border-[#E4E7EB] relative text-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#68707D] hover:text-[#111318] p-1 rounded-lg hover:bg-[#F6F7F9]"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#111318] tracking-tight">
              Pindai untuk Mengunduh {appName}
            </h3>
            <p className="text-xs text-[#68707D] mt-1 mb-5">
              Pindai kode QR ini dengan kamera HP untuk membuka halaman unduhan.
            </p>

            <div className="bg-[#F6F7F9] p-4 rounded-xl border border-[#E4E7EB] inline-block mx-auto mb-5">
              {qrImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrImageUrl}
                  alt={`Kode QR untuk portal unduhan ${appName}`}
                  className="w-48 h-48 mx-auto rounded-lg select-none"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-lg" />
              )}
            </div>

            <div className="flex items-center gap-2 bg-[#F6F7F9] p-2.5 rounded-xl border border-[#E4E7EB] text-xs text-[#68707D]">
              <span className="truncate flex-1 text-left font-mono">{portalUrl}</span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white border border-[#E4E7EB] hover:bg-gray-50 text-[#111318] shrink-0"
                aria-label="Salin tautan portal"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
