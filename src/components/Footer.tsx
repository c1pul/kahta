import React from "react";
import Link from "next/link";
import { Printer, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                <Printer className="w-5 h-5 text-navy-950" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gold-gradient">KAHTA</span>
                <span className="text-slate-200 ml-1">PRINTING</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Solusi printing terbaik untuk bisnis Anda. Kualitas premium
              dengan harga terjangkau.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Menu
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Beranda" },
                { href: "/products", label: "Produk" },
                { href: "/preview", label: "Preview Logo" },
                { href: "/cart", label: "Keranjang" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produk */}
          <div>
            <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Produk
            </h3>
            <ul className="space-y-3">
              {[
                "Kertas Nasi",
                "Box Makanan",
                "Paper Bag",
                "Sticker & Label",
                "Kartu Nama",
                "Cup Paper",
              ].map((product) => (
                <li key={product}>
                  <span className="text-slate-400 text-sm">{product}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Hubungi Kami
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <MessageCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>WhatsApp Official</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>info@kahtaprinting.com</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Kahta Printing. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Crafted with ❤️ for your printing needs
          </p>
        </div>
      </div>
    </footer>
  );
}
