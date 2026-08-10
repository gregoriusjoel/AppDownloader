# Static APK Download Portal 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16.3.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Portal distribusi dan pengunduhan aplikasi APK Android yang **100% Static & Serverless**. Website ini dirancang khusus untuk mengarahkan pengguna secara langsung ke file APK yang di-host di **GitHub Releases**, tanpa memerlukan backend, database, server-side download handler, atau VPS.

---

## ✨ Fitur Utama

- **100% Static & Fast (`output: 'export'`)**: Dikompilasi menjadi file HTML/CSS/JS murni yang dapat di-deploy secara gratis di Vercel, Netlify, atau GitHub Pages.
- **Direct GitHub Releases Link**: Pengunduhan ditangani langsung oleh browser pengakses menuju URL GitHub Release (`https://github.com/gregoriusjoel/ptpn/releases/download/ATQ/atq_v.1.2.2.apk`).
- **Isolasi Akses Pengunjung**: Pengguna umum yang mengakses tautan unduh (contoh: `/download/atq`) **tidak dapat mengakses dashboard admin** (tidak ada navigasi/tautan ke dashboard utama).
- **Proteksi PIN Admin (`2816`)**: Halaman utama portal (`/`) dilindungi oleh sistem PIN unik. Hanya pengelola yang dapat membuka dashboard untuk melihat semua aplikasi dan membuat Kode QR.
- **Publikasi GitHub Otomatis**: Menampilkan informasi publisher secara otomatis dari pemilik repositori GitHub Release (*"Published by gregoriusjoel"*).
- **Desain Premium & Responsive**: Tampilan mobile-first yang bersih, elegan, dan nyaman digunakan dengan satu tangan setelah pemindaian QR Code.
- **Generator Kode QR Terintegrasi**: Fitur modal untuk melihat dan menyalin Kode QR resmi setiap aplikasi.

---

## 📂 Struktur Proyek

```
downloader-web/
├── app/
│   ├── download/
│   │   └── [slug]/
│   │       └── page.tsx       # Halaman unduh publik (/download/atq)
│   ├── globals.css            # Desain sistem & variabel warna Tailwind
│   ├── layout.tsx             # Root layout Next.js
│   ├── not-found.tsx          # Halaman 404 minimalis
│   ├── page.tsx               # Dashboard Admin (Terproteksi PIN)
│   └── sitemap.ts             # Generator Sitemap static untuk SEO
├── components/
│   ├── AppHeader.tsx          # Header brand (Non-clickable untuk publik)
│   ├── AppIcon.tsx            # Logo aplikasi dengan fallback huruf awal
│   ├── DownloadButton.tsx     # Tombol utama "Download APK" (Direct link)
│   ├── InstallationGuide.tsx  # Panduan instalasi 4 langkah
│   ├── PlatformBadge.tsx      # Badge jenis platform aplikasi
│   └── QRCodeModal.tsx        # Modal generator & penyalin Kode QR
├── data/
│   └── apps.ts                # Konfigurasi static data aplikasi
├── public/
│   └── apps/
│       └── atq/
│         └── logo/ATQ.png    # Logo resmi ATQ
└── next.config.ts             # Konfigurasi Static Export Next.js
```

---

## 🛠️ Memulai (Local Development)

### 1. Prasyarat
- Node.js v18.x atau lebih baru
- npm / pnpm / yarn

### 2. Instalasi & Menjalankan Server Lokal

```bash
# Clone repository
git clone https://github.com/gregoriusjoel/ptpn.git
cd downloader-web

# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

- **Halaman Download ATQ**: [http://localhost:3000/download/atq](http://localhost:3000/download/atq)
- **Halaman Admin Dashboard**: [http://localhost:3000/](http://localhost:3000/) *(Masukkan PIN: `2816`)*

### 3. Menguji Build Static

```bash
npm run build
```
File static hasil build akan dikompilasi ke dalam direktori `out/`.

---

## ⚙️ Mengelola Konfigurasi Aplikasi (`data/apps.ts`)

Seluruh data aplikasi bersifat static dan dikelola melalui file [`data/apps.ts`](file:///Users/joelnaradata/jojo/downloader-web/data/apps.ts):

```typescript
export const APPS: Record<string, AppConfig> = {
  atq: {
    slug: "atq",
    name: "ATQ",
    description: "Aplikasi mobile resmi ATQ untuk manajemen lapangan dan operasional cepat.",
    version: "1.2.2",
    size: "89.9 MB",
    platform: "Android",
    developer: "gregoriusjoel", // Otomatis diekstrak dari owner URL GitHub jika dikosongkan
    icon: "/apps/atq/logo/ATQ.png",
    downloadUrl: "https://github.com/gregoriusjoel/ptpn/releases/download/ATQ/atq_v.1.2.2.apk",
  },
};
```

---

## 🔐 Akses Admin & Login PIN

- **PIN Default**: `2816`
- **Login melalui UI**: Akses `http://localhost:3000/`, klik **"Login Admin"**, lalu masukkan PIN `2816`.
- **Login via URL Direct**: Akses langsung via `http://localhost:3000/?pin=2816`.

---

## 🚀 Deployment ke Vercel

### Metode 1: Vercel CLI
```bash
npx vercel
```

### Metode 2: Vercel Dashboard (GitHub Integration)
1. Push proyek ini ke repository GitHub Anda.
2. Buka [Vercel Dashboard](https://vercel.com/new) dan pilih repository ini.
3. Framework Preset: **Next.js**.
4. Klik **Deploy**.

---

## 🌐 Menghubungkan Custom Domain

Untuk menggunakan subdomain khusus seperti `download.domainanda.com`:

1. Buka Vercel Project Dashboard → **Settings** → **Domains**.
2. Tambahkan domain: `download.domainanda.com`.
3. Tambahkan DNS Record pada provider DNS Anda:
   - **Type**: `CNAME`
   - **Name**: `download`
   - **Target**: `cname.vercel-dns.com`
4. URL pengunduhan resmi Anda akan menjadi:
   ```
   https://download.domainanda.com/download/atq
   ```

---

## 📄 Lisensi

Dikembangkan di bawah lisensi MIT. Bebas digunakan dan disesuaikan untuk kebutuhan distribusi aplikasi Anda.
