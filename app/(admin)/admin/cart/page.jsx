"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { readItems, STORAGE_KEYS, writeItems } from "@/lib/admin-data";

export default function CartPage() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setCarts(readItems(STORAGE_KEYS.carts, []));
  }, []);

  const handleDelete = (id) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa giỏ hàng ID: ${id}?`)) return;
    const updated = carts.filter((item) => String(item.id) !== String(id));
    writeItems(STORAGE_KEYS.carts, updated);
    setCarts(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý giỏ hàng</h1>
          <p className="text-sm text-slate-600">Danh sách giỏ hàng được lưu trong trình duyệt</p>
        </div>
        <Link href="/admin/cart/1/add" className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Thêm mới
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">UserId</th>
              <th className="px-4 py-3">CreatedAt</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {carts.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-10 text-center text-slate-500">Chưa có dữ liệu giỏ hàng.</td>
              </tr>
            ) : carts.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">{item.userId}</td>
                <td className="px-4 py-3">{item.createdAt}</td>
                <td className="px-4 py-3">{item.description}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(item.id)} className="rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
