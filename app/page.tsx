"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Palette,
  Shield,
  Clock,
  MessageCircle,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const features = [
  {
    icon: Palette,
    title: "Custom Design",
    desc: "Cetak desain dan logo custom sesuai keinginan Anda",
  },
  {
    icon: Shield,
    title: "Kualitas Premium",
    desc: "Material food-grade dan tinta berkualitas tinggi",
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    desc: "Proses cepat dan pengiriman ke seluruh Indonesia",
  },
  {
    icon: Clock,
    title: "Layanan 24/7",
    desc: "Tim kami siap membantu Anda kapan saja",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-title mb-4"
            >
              Produk Kami
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mx-auto"
            >
              Berbagai pilihan produk printing untuk memenuhi kebutuhan bisnis
              Anda
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products" className="btn-outline">
              Lihat Semua Produk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gold-gradient mb-4">
                Siap Mencetak?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Hubungi kami sekarang melalui WhatsApp untuk konsultasi gratis
                dan dapatkan penawaran terbaik.
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Kahta%20Printing%2C%20saya%20tertarik%20dengan%20layanan%20printing%20Anda"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5" />
                Hubungi via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
