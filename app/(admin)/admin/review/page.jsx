"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { readItems, STORAGE_KEYS, writeItems } from "@/lib/admin-data";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(readItems(STORAGE_KEYS.reviews, []));
  }, []);

  const handleDelete = (id) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa Review ID: ${id}?`)) return;
    const updated = reviews.filter((item) => String(item.id) !== String(id));
    writeItems(STORAGE_KEYS.reviews, updated);
    setReviews(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Review</h1>
          <p className="text-sm text-slate-600">Danh sách đánh giá và trạng thái duyệt</p>
        </div>
        <Link href="/admin/review/1/add" className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Thêm mới</Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">UserId</th>
              <th className="px-4 py-3">product_id</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">status</th>
              <th className="px-4 py-3">CreatedAt</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr><td colSpan="8" className="px-4 py-10 text-center text-slate-500">Chưa có dữ liệu đánh giá.</td></tr>
            ) : reviews.map((item) => (
              <tr key={item.id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">{item.userId}</td>
                <td className="px-4 py-3">{item.productId}</td>
                <td className="px-4 py-3">{item.rating}</td>
                <td className="px-4 py-3">{item.comment}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3">{item.createdAt}</td>
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
