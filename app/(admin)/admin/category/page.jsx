"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    setLoading(true);
    fetch(`${API_URL}/Categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh mục:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (confirm(`Bạn có chắc muốn xóa danh mục ID: ${id}?`)) {
      try {
        const response = await fetch(`${API_URL}/Categories/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Xóa thành công!");
          fetchCategories();
        } else {
          alert("Xóa thất bại!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        alert("Lỗi kết nối server!");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý danh mục</h1>
          <p className="text-sm text-slate-600">Danh sách danh mục kết nối CSDL thật</p>
        </div>
        <Link
          href="/admin/category/add"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Thêm mới
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">ParentId</th>
              <th className="px-4 py-3">SortOrder</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">CreatedAt</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="px-4 py-10 text-center text-slate-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-10 text-center text-slate-500">
                  Chưa có dữ liệu. Hãy thêm danh mục mới để bắt đầu.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-700">{cat.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-950">{cat.name}</td>
                  <td className="px-4 py-3 text-slate-600">{cat.description}</td>
                  <td className="px-4 py-3 text-slate-500">{cat.slug}</td>
                  <td className="px-4 py-3">{cat.parentId || "-"}</td>
                  <td className="px-4 py-3">{cat.sortOrder}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        cat.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString("vi-VN") : ""}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/category/${cat.id}/show`} className="text-blue-600 hover:underline">
                        Xem
                      </Link>
                      <Link href={`/admin/category/${cat.id}/update`} className="text-amber-600 hover:underline">
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700"
                      >
                        Xóa
                      </button>
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
