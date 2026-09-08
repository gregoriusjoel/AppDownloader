"use client";

import { useState, useEffect, useCallback } from "react";
import { QrCode, X, Copy, Check, Download, Loader2 } from "lucide-react";
import QRCode from "qrcode";

interface QRCodeModalProps {
  slug: string;
  appName: string;
  icon?: string;
  variant?: "compact" | "button";
}

export default function QRCodeModal({
  slug,
  appName,
  icon,
  variant = "compact",
}: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portalUrl, setPortalUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPortalUrl(`${window.location.origin}/download/${slug}`);
    }
  }, [slug]);

  const generateQRCode = useCallback(async () => {
    if (!portalUrl) return;
    setIsGenerating(true);

    try {
      const canvas = document.createElement("canvas");
      const size = 1000;
      canvas.width = size;
      canvas.height = size;

      await QRCode.toCanvas(canvas, portalUrl, {
        width: size,
        margin: 3,
        errorCorrectionLevel: "H",
        color: {
          dark: "#111318",
          light: "#FFFFFF",
        },
      });

      const ctx = canvas.getContext("2d");

      if (ctx && icon) {
        const logoImg = new Image();
        logoImg.crossOrigin = "anonymous";
        await new Promise<void>((resolve) => {
          logoImg.onload = () => resolve();
          logoImg.onerror = () => resolve();
          logoImg.src = icon;
        });

        if (logoImg.naturalWidth > 0 && logoImg.naturalHeight > 0) {
          const logoBoxSize = 240;
          const boxX = (size - logoBoxSize) / 2;
          const boxY = (size - logoBoxSize) / 2;
          const radius = 32;

          // Draw white card background for the logo
          ctx.save();
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(boxX, boxY, logoBoxSize, logoBoxSize, radius);
          } else {
            ctx.moveTo(boxX + radius, boxY);
            ctx.arcTo(boxX + logoBoxSize, boxY, boxX + logoBoxSize, boxY + logoBoxSize, radius);
            ctx.arcTo(boxX + logoBoxSize, boxY + logoBoxSize, boxX, boxY + logoBoxSize, radius);
            ctx.arcTo(boxX, boxY + logoBoxSize, boxX, boxY, radius);
            ctx.arcTo(boxX, boxY, boxX + logoBoxSize, boxY, radius);
            ctx.closePath();
          }
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.lineWidth = 6;
          ctx.strokeStyle = "#E4E7EB";
          ctx.stroke();
          ctx.clip();

          // Calculate logo sizing with padding
          const padding = 20;
          const maxDim = logoBoxSize - padding * 2;
          const ratio = Math.min(maxDim / logoImg.naturalWidth, maxDim / logoImg.naturalHeight);
          const drawW = logoImg.naturalWidth * ratio;
          const drawH = logoImg.naturalHeight * ratio;
          const drawX = boxX + (logoBoxSize - drawW) / 2;
          const drawY = boxY + (logoBoxSize - drawH) / 2;

          ctx.drawImage(logoImg, drawX, drawY, drawW, drawH);
          ctx.restore();
        }
      }

      setQrDataUrl(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error("Failed to generate QR code", err);
    } finally {
      setIsGenerating(false);
    }
  }, [portalUrl, icon]);

  useEffect(() => {
    if (isOpen && portalUrl) {
      generateQRCode();
    }
  }, [isOpen, portalUrl, generateQRCode]);

  const handleCopy = async () => {
    if (!portalUrl) return;
    await navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `${slug}-qr-code.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      {variant === "button" ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto min-w-[160px] h-14 px-6 rounded-full border border-[#E4E7EB] bg-white text-[#111318] font-semibold text-base flex items-center justify-center gap-2.5 shadow-sm hover:bg-[#F6F7F9] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-[#111318] focus:ring-offset-2 select-none cursor-pointer"
          aria-label={`Tampilkan Kode QR untuk ${appName}`}
        >
          <QrCode className="w-5 h-5 text-[#111318] stroke-[2.2]" />
          <span>Kode QR</span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#68707D] hover:text-[#111318] transition-colors py-1 px-2.5 rounded-lg border border-[#E4E7EB] bg-white shadow-2xs cursor-pointer"
          aria-label={`Tampilkan Kode QR untuk ${appName}`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Kode QR</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-sm w-full shadow-xl border border-[#E4E7EB] relative text-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#68707D] hover:text-[#111318] p-1.5 rounded-lg hover:bg-[#F6F7F9] transition-colors cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#111318] tracking-tight">
              Kode QR Unduhan {appName}
            </h3>
            <p className="text-xs text-[#68707D] mt-1 mb-4">
              Pindai dengan kamera ponsel atau unduh gambar untuk dibagikan.
            </p>

            <div className="bg-[#F6F7F9] p-3 rounded-2xl border border-[#E4E7EB] inline-block mx-auto mb-4">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt={`Kode QR untuk ${appName}`}
                  className="w-52 h-52 mx-auto rounded-xl select-none shadow-2xs"
                />
              ) : (
                <div className="w-52 h-52 bg-white rounded-xl border border-[#E4E7EB] flex flex-col items-center justify-center gap-2 text-xs text-[#68707D]">
                  <Loader2 className="w-6 h-6 animate-spin text-[#111318]" />
                  <span>Membuat Kode QR...</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={handleDownloadQr}
                disabled={!qrDataUrl || isGenerating}
                className="w-full h-11 px-4 rounded-xl bg-[#111318] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-black active:translate-y-0.5 transition-all disabled:opacity-50 select-none cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Gambar QR (PNG)</span>
              </button>

              <div className="flex items-center gap-2 bg-[#F6F7F9] p-2 rounded-xl border border-[#E4E7EB] text-xs text-[#68707D]">
                <span className="truncate flex-1 text-left font-mono pl-1 text-[11px] select-all">{portalUrl}</span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-white border border-[#E4E7EB] hover:bg-gray-50 text-[#111318] shrink-0 transition-colors cursor-pointer"
                  aria-label="Salin tautan portal"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
