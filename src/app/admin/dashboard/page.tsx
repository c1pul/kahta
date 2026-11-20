"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  LogOut,
  Save,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Users,
  Edit3,
  Check,
  X,
  Printer,
  RefreshCw,
} from "lucide-react";
import { products } from "@/data/products";
import { Order, StockData } from "@/types";
import { formatRupiah } from "@/lib/utils";

type Tab = "overview" | "stock" | "orders";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [stock, setStock] = useState<StockData>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("kahta-admin");
    if (auth !== "authenticated") {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);

    // Load stock data
    try {
      const savedStock = localStorage.getItem("kahta-stock");
      if (savedStock) {
        setStock(JSON.parse(savedStock));
      } else {
        // Initialize default stock
        const defaultStock: StockData = {};
        products.forEach((p) => {
          defaultStock[p.id] = {};
          p.sizes.forEach((s) => {
            defaultStock[p.id][s.id] = 10000;
          });
        });
        setStock(defaultStock);
        localStorage.setItem("kahta-stock", JSON.stringify(defaultStock));
      }
    } catch {}

    // Load orders
    try {
      const savedOrders = localStorage.getItem("kahta-orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch {}
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("kahta-admin");
    router.push("/admin");
  };

  const updateStock = useCallback(
    (productId: string, sizeId: string, value: number) => {
      const newStock = {
        ...stock,
        [productId]: { ...stock[productId], [sizeId]: Math.max(0, value) },
      };
      setStock(newStock);
      localStorage.setItem("kahta-stock", JSON.stringify(newStock));
      setEditingStock(null);
    },
    [stock]
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: Order["status"]) => {
      const updatedOrders = orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      );
      setOrders(updatedOrders);
      localStorage.setItem("kahta-orders", JSON.stringify(updatedOrders));
    },
    [orders]
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
    { id: "stock" as Tab, label: "Stok Produk", icon: Package },
    { id: "orders" as Tab, label: "Pesanan", icon: ClipboardList },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-gold-gradient flex items-center gap-2">
              <Printer className="w-6 h-6 text-gold-500" />
              Admin Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Kelola produk, stok, dan pesanan Kahta Printing
            </p>
          </div>
          <button onClick={handleLogout} className="btn-ghost text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-gold-500/15 text-gold-400 border border-gold-500/30"
                  : "bg-white/5 text-slate-400 border border-transparent hover:bg-white/10"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Produk",
                  value: products.length.toString(),
                  icon: Package,
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                },
                {
                  label: "Total Pesanan",
                  value: totalOrders.toString(),
                  icon: ShoppingCart,
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10",
                },
                {
                  label: "Total Revenue",
                  value: formatRupiah(totalRevenue),
                  icon: DollarSign,
                  color: "text-gold-400",
                  bg: "bg-gold-500/10",
                },
                {
                  label: "Pesanan Pending",
                  value: pendingOrders.toString(),
                  icon: TrendingUp,
                  color: "text-orange-400",
                  bg: "bg-orange-500/10",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-400">{stat.label}</span>
                    <div
                      className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}
                    >
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                Pesanan Terbaru
              </h3>
              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders
                    .slice(-5)
                    .reverse()
                    .map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg"
                      >
                        <div>
                          <span className="font-medium text-slate-200 text-sm">
                            {order.id}
                          </span>
                          <span className="text-slate-500 text-xs ml-2">
                            {order.customerName}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gold-400 font-medium text-sm">
                            {formatRupiah(order.total)}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : order.status === "processing"
                                  ? "bg-blue-500/10 text-blue-400"
                                  : order.status === "completed"
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm text-center py-8">
                  Belum ada pesanan
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Stock Tab */}
        {activeTab === "stock" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {products.map((product) => (
              <div key={product.id} className="card p-5">
                <h3 className="font-semibold text-slate-100 mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gold-500" />
                  {product.name}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">
                          Ukuran
                        </th>
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">
                          Dimensi
                        </th>
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">
                          Harga
                        </th>
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">
                          Stok
                        </th>
                        <th className="text-right py-2 px-3 text-slate-400 font-medium">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizes.map((size) => {
                        const stockKey = `${product.id}-${size.id}`;
                        const currentStock =
                          stock[product.id]?.[size.id] ?? 0;
                        const isEditing = editingStock === stockKey;

                        return (
                          <tr
                            key={size.id}
                            className="border-b border-white/[0.03] hover:bg-white/[0.02]"
                          >
                            <td className="py-3 px-3 text-slate-200">
                              {size.name}
                            </td>
                            <td className="py-3 px-3 text-slate-400">
                              {size.dimensions}
                            </td>
                            <td className="py-3 px-3 text-gold-400">
                              {formatRupiah(size.price)}
                            </td>
                            <td className="py-3 px-3">
                              {isEditing ? (
                                <input
                                  type="number"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-24 bg-white/5 border border-gold-500/30 rounded-lg px-2 py-1 text-slate-100 outline-none text-sm"
                                  autoFocus
                                />
                              ) : (
                                <span
                                  className={`font-medium ${currentStock < 1000 ? "text-red-400" : "text-slate-200"}`}
                                >
                                  {currentStock.toLocaleString("id-ID")}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-right">
                              {isEditing ? (
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() =>
                                      updateStock(
                                        product.id,
                                        size.id,
                                        parseInt(editValue) || 0
                                      )
                                    }
                                    className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setEditingStock(null)}
                                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingStock(stockKey);
                                    setEditValue(currentStock.toString());
                                  }}
                                  className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-gold-400"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-100">
                Semua Pesanan ({orders.length})
              </h3>
              <button
                onClick={() => {
                  const savedOrders = localStorage.getItem("kahta-orders");
                  if (savedOrders) setOrders(JSON.parse(savedOrders));
                }}
                className="btn-ghost text-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Refresh
              </button>
            </div>

            {orders.length > 0 ? (
              orders
                .slice()
                .reverse()
                .map((order) => (
                  <div key={order.id} className="card p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-100">
                            {order.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : order.status === "processing"
                                  ? "bg-blue-500/10 text-blue-400"
                                  : order.status === "completed"
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {order.customerName}
                          </span>
                          <span>📱 {order.customerPhone}</span>
                          <span>
                            {new Date(order.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value as Order["status"]
                            )
                          }
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 outline-none focus:border-gold-500/30"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2 px-3 bg-white/[0.02] rounded-lg text-sm"
                        >
                          <div>
                            <span className="text-slate-200">
                              {item.productName}
                            </span>
                            <span className="text-slate-500 ml-2">
                              {item.size.name} •{" "}
                              {item.quantity.toLocaleString("id-ID")} pcs
                            </span>
                          </div>
                          <span className="text-gold-400 font-medium">
                            {formatRupiah(item.size.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-end">
                      <span className="text-gold-400 font-semibold">
                        Total: {formatRupiah(order.total)}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <div className="card p-12 text-center">
                <ClipboardList className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400">Belum ada pesanan masuk</p>
                <p className="text-sm text-slate-500 mt-1">
                  Pesanan dari customer akan muncul di sini
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
