"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/lib/api";

export default function CategoryAddPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    parentId: "",
    sortOrder: 0,
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/Categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          parentId: form.parentId === "" ? null : Number(form.parentId),
          sortOrder: Number(form.sortOrder),
        }),
      });

      if (!res.ok) {
        alert("Thêm danh mục thất bại!");
        return;
      }

      alert("Thêm danh mục thành công!");
      router.push("/admin/category");
    } catch (err) {
      console.log(err);
      alert("Không thể kết nối server!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Danh mục</p>
          <h1 className="text-3xl font-bold text-slate-800">
            Thêm danh mục mới
          </h1>
        </div>

        <Link
          href="/admin/category"
          className="text-blue-600 hover:underline"
        >
          ← Quay lại
        </Link>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="block mb-2 font-medium">
              Tên danh mục
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3"
              placeholder="Ví dụ: Điện thoại"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Slug
            </label>

            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
              placeholder="dien-thoai"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Parent Id
            </label>

            <input
              type="number"
              name="parentId"
              value={form.parentId}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Thứ tự hiển thị
            </label>

            <input
              type="number"
              name="sortOrder"
              value={form.sortOrder}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Trạng thái
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">

            <label className="block mb-2 font-medium">
              Mô tả
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
              placeholder="Nhập mô tả danh mục..."
            />

          </div>

        </div>

        <div className="mt-8 flex gap-4">

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            💾 Lưu danh mục
          </button>

          <Link
            href="/admin/category"
            className="rounded-lg border px-6 py-3 hover:bg-slate-100"
          >
            Hủy
          </Link>

        </div>

      </div>

    </form>
  );
}