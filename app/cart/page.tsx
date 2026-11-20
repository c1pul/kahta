"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  MessageCircle,
  ShoppingBag,
  User,
  Phone,
  FileText,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupiah, createWhatsAppUrl, generateOrderId } from "@/lib/utils";

const WHATSAPP_NUMBER = "6281234567890";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const handleCheckout = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Mohon isi nama dan nomor telepon Anda.");
      return;
    }

    const orderId = generateOrderId();
    let message = `🛒 *PESANAN BARU - KAHTA PRINTING*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📋 Order ID: ${orderId}\n`;
    message += `👤 Nama: ${customerName}\n`;
    message += `📱 Telepon: ${customerPhone}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    items.forEach((item, i) => {
      message += `*${i + 1}. ${item.productName}*\n`;
      message += `   📐 Ukuran: ${item.size.name} (${item.size.dimensions})\n`;
      message += `   🔢 Jumlah: ${item.quantity.toLocaleString("id-ID")} pcs\n`;
      message += `   💰 Harga: ${formatRupiah(item.size.price)}/pcs\n`;
      message += `   📊 Subtotal: ${formatRupiah(item.size.price * item.quantity)}\n`;
      if (item.logoFileName) {
        message += `   🎨 Logo: ${item.logoFileName}\n`;
      }
      if (item.notes) {
        message += `   📝 Catatan: ${item.notes}\n`;
      }
      message += `\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL: ${formatRupiah(totalPrice)}*\n`;
    if (orderNotes) {
      message += `\n📝 Catatan Tambahan: ${orderNotes}\n`;
    }
    message += `\nTerima kasih! 🙏`;

    // Save order to localStorage for admin
    try {
      const orders = JSON.parse(localStorage.getItem("kahta-orders") || "[]");
      orders.push({
        id: orderId,
        items: items.map((i) => ({ ...i, logoUrl: undefined })),
        total: totalPrice,
        customerName,
        customerPhone,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("kahta-orders", JSON.stringify(orders));
    } catch {}

    const url = createWhatsAppUrl(WHATSAPP_NUMBER, message);
    window.open(url, "_blank");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20"
          >
            <ShoppingBag className="w-20 h-20 text-slate-700 mx-auto mb-6" />
            <h1 className="text-2xl font-display font-bold text-slate-200 mb-3">
              Keranjang Kosong
            </h1>
            <p className="text-slate-400 mb-8">
              Belum ada produk di keranjang. Yuk pilih produk dulu!
            </p>
            <Link href="/products" className="btn-gold">
              <ShoppingCart className="w-4 h-4" />
              Lihat Produk
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link href="/products" className="btn-ghost mb-8 -ml-4 inline-flex">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Lanjut Belanja
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-display font-bold text-gold-gradient">
                Keranjang Belanja
              </h1>
              <button
                onClick={clearCart}
                className="text-sm text-red-400/60 hover:text-red-400 transition-colors"
              >
                Hapus Semua
              </button>
            </div>

            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.cartId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="card p-5"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Logo Preview */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold-500/10 to-gold-500/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.logoUrl ? (
                        <img
                          src={item.logoUrl}
                          alt="Logo"
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-gold-500/50" />
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-100">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {item.size.name} — {item.size.dimensions}
                      </p>
                      <p className="text-gold-400 font-medium mt-1">
                        {formatRupiah(item.size.price)}/pcs
                      </p>
                      {item.notes && (
                        <p className="text-xs text-slate-500 mt-1">
                          📝 {item.notes}
                        </p>
                      )}
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity - 100)
                          }
                          className="p-2 hover:bg-white/5 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3 text-slate-400" />
                        </button>
                        <span className="w-16 text-center text-sm font-medium text-slate-200">
                          {item.quantity.toLocaleString("id-ID")}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cartId, item.quantity + 100)
                          }
                          className="p-2 hover:bg-white/5 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-slate-100">
                          {formatRupiah(item.size.price * item.quantity)}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="p-2 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 sticky top-28 space-y-5"
            >
              <h2 className="text-lg font-semibold text-slate-100">
                Ringkasan Pesanan
              </h2>

              {/* Customer Info */}
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Nama Anda *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="input-field pl-10 py-2.5 text-sm"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="No. WhatsApp *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="input-field pl-10 py-2.5 text-sm"
                  />
                </div>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <textarea
                    placeholder="Catatan tambahan (opsional)"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="input-field pl-10 py-2.5 text-sm resize-none h-20"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 py-4 border-t border-b border-white/5">
                {items.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-slate-400 truncate mr-2">
                      {item.productName} ×{item.quantity.toLocaleString("id-ID")}
                    </span>
                    <span className="text-slate-300 flex-shrink-0">
                      {formatRupiah(item.size.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-gold-400 font-semibold">Total</span>
                <span className="text-xl font-bold text-gold-gradient">
                  {formatRupiah(totalPrice)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Pesan via WhatsApp
              </button>

              <p className="text-xs text-slate-500 text-center">
                Pesanan akan dikirim ke WhatsApp official Kahta Printing
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
