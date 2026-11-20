# KAHTA PRINTING 🖨️

Website modern untuk perusahaan printing **KAHTA PRINTING** — dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS.

## ✨ Fitur

- 🎨 **UI/UX Modern & Elegant** — Dark theme dengan aksen gold, glassmorphism, dan animasi smooth
- 🛒 **Keranjang Belanja** — Tambah, hapus, ubah jumlah pesanan
- 📐 **Pilihan Ukuran** — Setiap produk tersedia dalam berbagai ukuran
- 👁️ **Preview Logo** — Upload logo dan lihat demo pada berbagai produk (drag, resize, rotate)
- 📱 **WhatsApp Redirect** — Semua pesanan langsung dikirim ke WhatsApp official
- 🔐 **Admin Dashboard** — Login admin untuk kelola stok dan lihat pesanan
- 🚀 **Siap Deploy Vercel** — Optimized untuk deployment di Vercel

## 📦 Produk

- Kertas Nasi (custom print)
- Box Makanan
- Paper Bag
- Sticker & Label
- Kartu Nama
- Cup Paper

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔐 Admin Login (Demo)

- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `kahta2024`

## 📱 WhatsApp

Ganti nomor WhatsApp di file berikut:
- `src/app/cart/page.tsx` — variable `WHATSAPP_NUMBER`
- `src/app/page.tsx` — link WhatsApp di CTA section
- `src/app/products/[id]/page.tsx` — link WhatsApp

## 🌐 Deploy ke Vercel

1. Push ke GitHub repository
2. Import project di [vercel.com](https://vercel.com)
3. Deploy otomatis!

Atau gunakan Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🛠️ Tech Stack

- **Next.js 14** — React framework dengan App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animasi smooth
- **Lucide React** — Icon library

---

Built with ❤️ by KAHTA PRINTING
