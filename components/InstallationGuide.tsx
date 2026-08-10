import { Info } from "lucide-react";

interface InstallationGuideProps {
  platform?: string;
}

export default function InstallationGuide({ platform = "Android" }: InstallationGuideProps) {
  const isAndroid = /android/i.test(platform);

  const steps = isAndroid
    ? [
        {
          step: "01",
          title: "Unduh File APK",
          description: "Ketuk tombol unduh untuk menyimpan file APK ke perangkat Anda.",
        },
        {
          step: "02",
          title: "Buka File APK",
          description: "Buka file yang diunduh dari pengelola file atau riwayat unduhan browser.",
        },
        {
          step: "03",
          title: "Izinkan Penginstalan",
          description: "Jika Android meminta izin, aktifkan 'Izinkan dari sumber ini'.",
        },
        {
          step: "04",
          title: "Pasang Aplikasi",
          description: "Ketuk Pasang untuk menyelesaikan proses instalasi di HP Anda.",
        },
      ]
    : [
        {
          step: "01",
          title: "Unduh Berkas Aplikasi",
          description: "Ketuk tombol unduh untuk menyimpan paket instalasi.",
        },
        {
          step: "02",
          title: "Buka Berkas",
          description: "Cari dan buka berkas installer yang telah diunduh.",
        },
        {
          step: "03",
          title: "Berikan Izin System",
          description: "Konfirmasi dan izinkan hak akses jika diminta oleh sistem.",
        },
        {
          step: "04",
          title: "Selesaikan Instalasi",
          description: "Ikuti petunjuk di layar untuk menyelesaikan pemasangan.",
        },
      ];

  return (
    <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#111318] tracking-tight mb-6">
        Langkah Instalasi
      </h2>

      <div className="space-y-6">
        {steps.map((s) => (
          <div key={s.step} className="flex items-start gap-4">
            <span className="text-xs font-bold text-[#68707D] bg-[#F6F7F9] border border-[#E4E7EB] w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              {s.step}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#111318]">{s.title}</h3>
              <p className="text-xs text-[#68707D] mt-0.5 leading-relaxed">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#E4E7EB] flex items-start gap-3 bg-[#F6F7F9] p-4 rounded-xl">
        <Info className="w-4 h-4 text-[#68707D] shrink-0 mt-0.5" />
        <p className="text-xs text-[#68707D] leading-relaxed">
          {isAndroid
            ? "Android mungkin meminta izin untuk mengizinkan penginstalan dari sumber ini karena aplikasi dipasang di luar Google Play Store."
            : `Sistem operasi Anda mungkin memerlukan izin saat memasang aplikasi langsung dari sumber resmi di luar toko aplikasi bawaan.`}
        </p>
      </div>
    </div>
  );
}
