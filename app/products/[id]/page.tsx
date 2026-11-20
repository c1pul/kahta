"use client";

import React, { useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Upload,
  Check,
  Eye,
  Newspaper,
  Box,
  ShoppingBag,
  Sticker,
  CreditCard,
  Coffee,
  MessageCircle,
} from "lucide-react";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  Newspaper,
  Box,
  ShoppingBag,
  Sticker,
  CreditCard,
  Coffee,
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const product = getProductById(params.id as string);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(product?.minOrder || 100);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState("");
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!product) {
    return (
      <div className="pt-28 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-slate-200 mb-4">
            Produk tidak ditemukan
          </h1>
          <Link href="/products" className="btn-outline">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Produk
          </Link>
        </div>
      </div>
    );
  }

  const selectedSize = product.sizes[selectedSizeIndex];
  const totalPrice = selectedSize.price * quantity;
  const Icon = iconMap[product.iconName] || Box;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
        setLogoFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      quantity,
      logoUrl: logoUrl || undefined,
      logoFileName: logoFileName || undefined,
      notes: notes || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={() => router.back()}
            className="btn-ghost mb-8 -ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image / Icon */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-grid opacity-30" />
              <Icon className="w-32 h-32 text-slate-300/60 relative z-10" />
              {logoUrl && (
                <div className="absolute bottom-6 right-6 w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20 bg-white shadow-lg">
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <span className="badge mb-3">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-100 mt-3">
                {product.name}
              </h1>
              <p className="text-slate-400 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-3">
                Pilih Ukuran
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.sizes.map((size, i) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSizeIndex(i)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedSizeIndex === i
                        ? "bg-gold-500/15 border-2 border-gold-500/50 shadow-lg shadow-gold-500/5"
                        : "bg-white/5 border-2 border-transparent hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-semibold ${selectedSizeIndex === i ? "text-gold-400" : "text-slate-200"}`}
                      >
                        {size.name}
                      </span>
                      {selectedSizeIndex === i && (
                        <Check className="w-4 h-4 text-gold-500" />
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      {size.dimensions}
                    </div>
                    <div className="text-gold-400 font-semibold mt-2">
                      {formatRupiah(size.price)}
                      <span className="text-slate-500 text-xs font-normal">
                        /pcs
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-3">
                Jumlah Pesanan
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/5 rounded-xl border border-white/10">
                  <button
                    onClick={() =>
                      setQuantity(Math.max(product.minOrder, quantity - 100))
                    }
                    className="p-3 hover:bg-white/5 rounded-l-xl transition-colors"
                  >
                    <Minus className="w-4 h-4 text-slate-400" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          product.minOrder,
                          parseInt(e.target.value) || product.minOrder
                        )
                      )
                    }
                    className="w-24 text-center bg-transparent text-slate-100 outline-none font-medium"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 100)}
                    className="p-3 hover:bg-white/5 rounded-r-xl transition-colors"
                  >
                    <Plus className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Min. {product.minOrder.toLocaleString("id-ID")} pcs
                </span>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-3">
                Upload Logo{" "}
                <span className="text-slate-500 font-normal normal-case">
                  (opsional)
                </span>
              </h3>
              <input
                type="file"
                ref={fileRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-gold-500/30 hover:bg-white/5 transition-all text-left"
              >
                {logoUrl ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-white/20">
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gold-400 font-medium">
                        {logoFileName}
                      </p>
                      <p className="text-xs text-slate-500">
                        Klik untuk ganti
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-300">
                        Upload logo Anda
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, SVG
                      </p>
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-3">
                Catatan{" "}
                <span className="text-slate-500 font-normal normal-case">
                  (opsional)
                </span>
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tambahkan catatan khusus untuk pesanan..."
                className="input-field resize-none h-24"
              />
            </div>

            {/* Price Summary */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">
                  {selectedSize.name} × {quantity.toLocaleString("id-ID")} pcs
                </span>
                <span className="text-slate-200 font-semibold">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
              <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between">
                <span className="text-gold-400 font-semibold">Total</span>
                <span className="text-2xl font-bold text-gold-gradient">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                  added
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "btn-gold"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Ditambahkan!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Masukkan Keranjang
                  </>
                )}
              </button>
              <Link href="/preview" className="btn-outline flex-shrink-0 py-4">
                <Eye className="w-5 h-5" />
                Preview
              </Link>
            </div>

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                `Halo Kahta Printing, saya tertarik dengan produk:\n\n📦 ${product.name}\n📐 Ukuran: ${selectedSize.name} (${selectedSize.dimensions})\n🔢 Jumlah: ${quantity.toLocaleString("id-ID")} pcs\n💰 Estimasi: ${formatRupiah(totalPrice)}\n\nMohon info lebih lanjut.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 font-medium transition-all hover:bg-emerald-600/30 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Tanya via WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
