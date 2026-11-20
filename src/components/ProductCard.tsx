
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
  const lowestPrice = Math.min(
    ...product.sizes.map((s) => s.price)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <div className="card p-6 h-full flex flex-col">

          {/* Product Image */}
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 relative">
            <img
              src={`/products/${product.id}.jpg`}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Category Badge */}
          <div className="badge mb-3">
            {product.category}
          </div>

          {/* Info */}
          <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-gold-400 transition-colors">
            {product.name}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
            {product.description}
          </p>

          {/* Footer */}
          <div className="flex items-end justify-between pt-4 border-t border-white/5">
            <div>
              <span className="text-xs text-slate-500">
                Mulai dari
              </span>
              <div className="text-gold-400 font-semibold">
                {formatRupiah(lowestPrice)}
                <span className="text-slate-500 text-xs font-normal">
                  /pcs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-slate-400 group-hover:text-gold-400 transition-colors">
              Detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Min Order */}
          <div className="mt-3 text-xs text-slate-500">
            Min. order: {product.minOrder.toLocaleString("id-ID")} pcs
          </div>

        </div>
      </Link>
    </motion.div>
  );
}
