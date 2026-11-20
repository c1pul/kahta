"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo credentials
    setTimeout(() => {
      if (username === "admin" && password === "kahta2024") {
        localStorage.setItem("kahta-admin", "authenticated");
        router.push("/admin/dashboard");
      } else {
        setError("Username atau password salah");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gold-500/10 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-gold-500" />
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-100">
              Admin Panel
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Masuk untuk mengelola produk dan pesanan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="input-field pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Masuk
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gold-500/5 rounded-xl border border-gold-500/10">
            <p className="text-xs text-gold-400/80 text-center font-medium mb-2">
              Demo Credentials
            </p>
            <div className="flex justify-center gap-6 text-xs text-slate-400">
              <span>
                User: <code className="text-gold-400">admin</code>
              </span>
              <span>
                Pass: <code className="text-gold-400">kahta2024</code>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
