"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "../../../lib/api";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/Products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách sản phẩm:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-xl font-extrabold text-blue-600">TechStore</span>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
              <Link href="/product" className="text-blue-600">Sản phẩm</Link>
              <Link href="/admin" className="hover:text-blue-600">Quản trị Admin</Link>
            </nav>
          </div>
          <div className="text-sm text-slate-500">Kênh Người dùng</div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Tất cả sản phẩm</h1>

        {loading ? (
          <div className="text-center py-12 text-slate-500 text-lg">Đang tải sản phẩm từ CSDL...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-lg bg-white rounded-2xl border border-slate-200">
            Chưa có sản phẩm nào.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="aspect-square bg-slate-100 flex items-center justify-center text-slate-400">
                  {product.thumbnail ? (
                    <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-blue-600 font-bold">{formatPrice(product.price)}</span>
                    <Link href={`/product/${product.id}`} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition">Chi tiết</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
