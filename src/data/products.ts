import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "kertas-nasi",
    name: "Kertas Nasi",
    description:
      "Kertas pembungkus nasi custom dengan logo dan desain Anda. Cocok untuk rumah makan, warung, dan catering. Dicetak dengan tinta food-grade yang aman.",
    category: "Packaging",
    iconName: "Newspaper",
    gradient: "from-amber-500/20 to-orange-500/20",
    sizes: [
      { id: "kn-s", name: "Small", dimensions: "20 × 20 cm", price: 150 },
      { id: "kn-m", name: "Medium", dimensions: "25 × 25 cm", price: 200 },
      { id: "kn-l", name: "Large", dimensions: "30 × 30 cm", price: 275 },
      {
        id: "kn-xl",
        name: "Extra Large",
        dimensions: "35 × 35 cm",
        price: 350,
      },
    ],
    minOrder: 1000,
    customizable: true,
  },
  {
    id: "box-makanan",
    name: "Box Makanan",
    description:
      "Dus makanan custom printing untuk packaging makanan premium. Tersedia berbagai ukuran untuk nasi box, snack box, kue, dan lainnya. Material food-grade.",
    category: "Packaging",
    iconName: "Box",
    gradient: "from-blue-500/20 to-cyan-500/20",
    sizes: [
      {
        id: "bm-s",
        name: "Small",
        dimensions: "12 × 12 × 7 cm",
        price: 800,
      },
      {
        id: "bm-m",
        name: "Medium",
        dimensions: "18 × 12 × 7 cm",
        price: 1200,
      },
      {
        id: "bm-l",
        name: "Large",
        dimensions: "20 × 14 × 8 cm",
        price: 1500,
      },
      {
        id: "bm-xl",
        name: "Extra Large",
        dimensions: "25 × 18 × 10 cm",
        price: 2000,
      },
    ],
    minOrder: 500,
    customizable: true,
  },
  {
    id: "paper-bag",
    name: "Paper Bag",
    description:
      "Tas kertas custom dengan logo perusahaan Anda. Perfect untuk packaging premium, gift bag, dan branding. Bahan kraft tebal dan kokoh.",
    category: "Packaging",
    iconName: "ShoppingBag",
    gradient: "from-emerald-500/20 to-teal-500/20",
    sizes: [
      {
        id: "pb-s",
        name: "Small",
        dimensions: "18 × 8 × 22 cm",
        price: 2500,
      },
      {
        id: "pb-m",
        name: "Medium",
        dimensions: "25 × 10 × 30 cm",
        price: 3500,
      },
      {
        id: "pb-l",
        name: "Large",
        dimensions: "30 × 12 × 40 cm",
        price: 5000,
      },
    ],
    minOrder: 200,
    customizable: true,
  },
  {
    id: "sticker-label",
    name: "Sticker & Label",
    description:
      "Sticker dan label custom untuk produk Anda. Tersedia dalam berbagai bentuk dan ukuran. Cocok untuk branding produk, segel, dan dekorasi.",
    category: "Branding",
    iconName: "Sticker",
    gradient: "from-purple-500/20 to-pink-500/20",
    sizes: [
      {
        id: "sl-xs",
        name: "Extra Small",
        dimensions: "3 × 3 cm",
        price: 100,
      },
      { id: "sl-s", name: "Small", dimensions: "5 × 5 cm", price: 150 },
      { id: "sl-m", name: "Medium", dimensions: "7 × 7 cm", price: 250 },
      { id: "sl-l", name: "Large", dimensions: "10 × 10 cm", price: 400 },
    ],
    minOrder: 100,
    customizable: true,
  },
  {
    id: "kartu-nama",
    name: "Kartu Nama",
    description:
      "Kartu nama profesional dengan berbagai pilihan material dan finishing premium. Tingkatkan kesan pertama bisnis Anda.",
    category: "Branding",
    iconName: "CreditCard",
    gradient: "from-rose-500/20 to-red-500/20",
    sizes: [
      {
        id: "kn-std",
        name: "Standard",
        dimensions: "9 × 5.5 cm",
        price: 500,
      },
      {
        id: "kn-prm",
        name: "Premium Doff",
        dimensions: "9 × 5.5 cm (Laminasi Doff)",
        price: 800,
      },
      {
        id: "kn-lux",
        name: "Luxury Glossy",
        dimensions: "9 × 5.5 cm (Laminasi Glossy)",
        price: 1200,
      },
    ],
    minOrder: 100,
    customizable: true,
  },
  {
    id: "cup-paper",
    name: "Cup Paper",
    description:
      "Gelas kertas custom untuk minuman dingin dan panas. Ideal untuk cafe, kedai kopi, restoran, dan event. Food-grade dan ramah lingkungan.",
    category: "Packaging",
    iconName: "Coffee",
    gradient: "from-yellow-500/20 to-amber-500/20",
    sizes: [
      { id: "cp-6", name: "6.5 oz", dimensions: "±190 ml", price: 600 },
      { id: "cp-8", name: "8 oz", dimensions: "±240 ml", price: 750 },
      { id: "cp-12", name: "12 oz", dimensions: "±360 ml", price: 900 },
      { id: "cp-16", name: "16 oz", dimensions: "±480 ml", price: 1100 },
    ],
    minOrder: 1000,
    customizable: true,
  },
];

export const categories = [...new Set(products.map((p) => p.category))];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
