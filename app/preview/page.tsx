"use client";

import React from "react";
import { motion } from "framer-motion";
import LogoPreview from "@/components/LogoPreview";

export default function PreviewPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title mb-4"
          >
            Preview Logo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Upload logo Anda dan lihat bagaimana tampilannya pada berbagai
            produk printing kami
          </motion.p>
        </div>

        {/* Preview Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LogoPreview />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card p-8 text-center"
        >
          <h3 className="text-lg font-semibold text-slate-100 mb-2">
            💡 Tips Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm text-slate-400">
            <div>
              <div className="text-gold-400 font-semibold mb-1">
                Upload Logo
              </div>
              <p>
                Gunakan file PNG atau SVG dengan background transparan untuk
                hasil terbaik.
              </p>
            </div>
            <div>
              <div className="text-gold-400 font-semibold mb-1">
                Atur Posisi
              </div>
              <p>
                Drag logo pada preview untuk mengatur posisi penempatan yang
                diinginkan.
              </p>
            </div>
            <div>
              <div className="text-gold-400 font-semibold mb-1">
                Download Preview
              </div>
              <p>
                Simpan hasil preview sebagai gambar untuk referensi atau
                persetujuan tim.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
