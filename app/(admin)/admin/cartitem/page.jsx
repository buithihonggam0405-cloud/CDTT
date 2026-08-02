"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { readItems, STORAGE_KEYS, writeItems } from "@/lib/admin-data";

export default function CartItemPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(readItems(STORAGE_KEYS.cartItems, []));
  }, []);

  const handleDelete = (id) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa CartItem ID: ${id}?`)) return;
    const updated = cartItems.filter((item) => String(item.id) !== String(id));
    writeItems(STORAGE_KEYS.cartItems, updated);
    setCartItems(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý CartItem</h1>
          <p className="text-sm text-slate-600">Danh sách sản phẩm trong giỏ hàng</p>
        </div>
        <Link href="/admin/cartitem/1/add" className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Thêm mới</Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">CartId</th>
              <th className="px-4 py-3">ProductId</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr><td colSpan="5" className="px-4 py-10 text-center text-slate-500">Chưa có dữ liệu CartItem.</td></tr>
            ) : cartItems.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">{item.cartId}</td>
                <td className="px-4 py-3">{item.productId}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(item.id)} className="rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
