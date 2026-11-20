"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Download,
  Trash2,
  Move,
} from "lucide-react";
import { products } from "@/data/products";

interface LogoPosition {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const mockupShapes: Record<
  string,
  { width: number; height: number; label: string; bgColor: string; shape: string }
> = {
  "kertas-nasi": {
    width: 300,
    height: 300,
    label: "Kertas Nasi",
    bgColor: "bg-amber-50",
    shape: "rounded-sm",
  },
  "box-makanan": {
    width: 320,
    height: 220,
    label: "Box Makanan",
    bgColor: "bg-orange-50",
    shape: "rounded-md",
  },
  "paper-bag": {
    width: 240,
    height: 340,
    label: "Paper Bag",
    bgColor: "bg-emerald-50",
    shape: "rounded-t-md",
  },
  "sticker-label": {
    width: 200,
    height: 200,
    label: "Sticker",
    bgColor: "bg-purple-50",
    shape: "rounded-full",
  },
  "kartu-nama": {
    width: 340,
    height: 200,
    label: "Kartu Nama",
    bgColor: "bg-rose-50",
    shape: "rounded-md",
  },
  "cup-paper": {
    width: 200,
    height: 280,
    label: "Cup Paper",
    bgColor: "bg-yellow-50",
    shape: "rounded-b-[40%]",
  },
};

export default function LogoPreview() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [position, setPosition] = useState<LogoPosition>({
    x: 50,
    y: 50,
    scale: 1,
    rotation: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setLogoUrl(reader.result as string);
          setLogoFileName(file.name);
          setPosition({ x: 50, y: 50, scale: 1, rotation: 0 });
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
        setLogoFileName(file.name);
        setPosition({ x: 50, y: 50, scale: 1, rotation: 0 });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!previewRef.current) return;
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      };
    },
    [position]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !previewRef.current) return;
      const rect = previewRef.current.getBoundingClientRect();
      const dx = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
      const dy = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
      setPosition((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(100, dragRef.current.startPosX + dx)),
        y: Math.max(0, Math.min(100, dragRef.current.startPosY + dy)),
      }));
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const mockup = mockupShapes[selectedProduct];

  const handleDownload = useCallback(() => {
    if (!previewRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = mockup.width * 2;
    canvas.height = mockup.height * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#fef3c7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (logoUrl) {
      const img = new Image();
      img.onload = () => {
        const logoSize = 80 * position.scale * 2;
        const lx = (position.x / 100) * canvas.width - logoSize / 2;
        const ly = (position.y / 100) * canvas.height - logoSize / 2;
        ctx.save();
        ctx.translate(lx + logoSize / 2, ly + logoSize / 2);
        ctx.rotate((position.rotation * Math.PI) / 180);
        ctx.drawImage(img, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
        ctx.restore();

        const link = document.createElement("a");
        link.download = `kahta-preview-${selectedProduct}.png`;
        link.href = canvas.toDataURL();
        link.click();
      };
      img.src = logoUrl;
    }
  }, [logoUrl, mockup, position, selectedProduct]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Upload & Controls */}
      <div className="space-y-6">
        {/* Upload Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="card p-8 cursor-pointer text-center group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          {logoUrl ? (
            <div className="space-y-4">
              <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-gold-500/30">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="w-full h-full object-contain bg-white p-2"
                />
              </div>
              <div>
                <p className="text-sm text-gold-400 font-medium">
                  {logoFileName}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Klik untuk ganti logo
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                <Upload className="w-8 h-8 text-gold-500" />
              </div>
              <div>
                <p className="text-slate-200 font-medium">Upload Logo Anda</p>
                <p className="text-sm text-slate-500 mt-1">
                  Drag & drop atau klik untuk memilih file
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  PNG, JPG, SVG (Maks. 5MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Product Selector */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-3">
            Pilih Produk
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedProduct === p.id
                    ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                    : "bg-white/5 text-slate-400 border border-transparent hover:bg-white/10 hover:text-slate-300"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        {logoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5 space-y-4"
          >
            <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider">
              Kontrol Logo
            </h3>

            {/* Scale */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" /> Ukuran
                </span>
                <span className="text-xs text-slate-500">
                  {Math.round(position.scale * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="3"
                step="0.1"
                value={position.scale}
                onChange={(e) =>
                  setPosition((p) => ({
                    ...p,
                    scale: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-gold-500"
              />
            </div>

            {/* Rotation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <RotateCw className="w-3 h-3" /> Rotasi
                </span>
                <span className="text-xs text-slate-500">
                  {position.rotation}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={position.rotation}
                onChange={(e) =>
                  setPosition((p) => ({
                    ...p,
                    rotation: parseInt(e.target.value),
                  }))
                }
                className="w-full accent-gold-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={handleDownload} className="btn-gold flex-1 text-sm py-2">
                <Download className="w-4 h-4" />
                Download Preview
              </button>
              <button
                onClick={() => {
                  setLogoUrl(null);
                  setLogoFileName("");
                }}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Preview Area */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider">
            Preview
          </h3>
          {logoUrl && (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Move className="w-3 h-3" /> Drag logo untuk atur posisi
            </span>
          )}
        </div>
        <div className="flex items-center justify-center min-h-[400px] bg-white/[0.02] rounded-xl border border-white/5 p-8">
          <div
            ref={previewRef}
            className={`relative ${mockup.bgColor} ${mockup.shape} overflow-hidden shadow-2xl transition-all duration-300`}
            style={{ width: mockup.width, height: mockup.height }}
          >
            {/* Grid pattern on mockup */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #999 0.5px, transparent 0.5px)",
                  backgroundSize: "12px 12px",
                }}
              />
            </div>

            {/* Product Label */}
            <div className="absolute top-2 left-2 bg-black/10 text-black/40 text-[10px] font-medium px-2 py-0.5 rounded">
              {mockup.label}
            </div>

            {/* Logo */}
            {logoUrl ? (
              <div
                className={`absolute select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: `translate(-50%, -50%) scale(${position.scale}) rotate(${position.rotation}deg)`,
                }}
                onMouseDown={handleMouseDown}
              >
                <img
                  src={logoUrl}
                  alt="Logo Preview"
                  className="w-20 h-20 object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-black/20">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs font-medium">Upload logo</p>
                  <p className="text-[10px]">untuk melihat preview</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-slate-400 text-center">
            Preview ini merupakan simulasi penempatan logo pada produk.
            Hasil akhir cetak dapat berbeda tergantung material dan ukuran yang dipilih.
          </p>
        </div>
      </div>
    </div>
  );
}
