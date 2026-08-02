"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { readItems, STORAGE_KEYS, writeItems } from "@/lib/admin-data";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = readItems(STORAGE_KEYS.products, []);
    setProducts(storedProducts);
    setLoading(false);
  }, []);

  const handleDelete = (id) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa sản phẩm ID: ${id}?`)) return;
    const updated = products.filter((item) => String(item.id) !== String(id));
    writeItems(STORAGE_KEYS.products, updated);
    setProducts(updated);
    alert("Xóa sản phẩm thành công!");
  };

  const totalStock = products.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
  const lowStockCount = products.filter((p) => (p.quantity || 0) < 10).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý sản phẩm</h1>
          <p className="text-sm text-slate-600">Danh sách sản phẩm được lưu trực tiếp trong trình duyệt</p>
        </div>
        <Link href="/admin/product/add" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
          Thêm sản phẩm
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Tổng sản phẩm</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Tổng tồn kho</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">{totalStock}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Sản phẩm sắp hết hàng (&lt; 10)</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">{lowStockCount}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">CategoryId</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">CreatedAt</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-10 text-center text-slate-500">Đang tải dữ liệu...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-10 text-center text-slate-500">Chưa có dữ liệu sản phẩm nào. Hãy thêm mới để bắt đầu.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-700">{product.id}</td>
                  <td className="px-4 py-3">{product.category_id || product.categoryId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.thumbnail ? (
                        <img src={product.thumbnail} alt={product.name} className="h-12 w-12 rounded-lg border border-slate-200 object-cover" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-slate-300 text-[10px] text-slate-400">
                          No img
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-900">{product.name}</div>
                        <div className="text-xs text-slate-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">{product.quantity}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{product.status}</span>
                  </td>
                  <td className="px-4 py-3">{product.createdAt || ""}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/product/${product.id}/show`} className="text-blue-600 hover:underline">Xem</Link>
                      <Link href={`/admin/product/${product.id}/update`} className="text-amber-600 hover:underline">Sửa</Link>
                      <button onClick={() => handleDelete(product.id)} className="rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
