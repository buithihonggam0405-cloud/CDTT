"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProducts, updateProduct } from "@/lib/api";

export default function UpdateProductPage() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    category_id: 1,
    name: "",
    description: "",
    price: 0,
    thumbnail: "",
    quantity: 0,
    status: "Active",
    createdAt: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      setForm((prev) => ({ ...prev, thumbnail: dataUrl }));
      setImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailChange = (value) => {
    setForm((prev) => ({ ...prev, thumbnail: value }));
    setImagePreview(value);
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await getProducts();
        const product = products.find((item) => String(item.id) === String(params.id));
        if (product) {
          setForm({
            category_id: product.categoryId || product.category_id || 1,
            name: product.name || "",
            description: product.description || "",
            price: product.price || 0,
            thumbnail: product.thumbnail || "",
            quantity: product.quantity || 0,
            status: product.status || "Active",
            createdAt: product.createdAt ? product.createdAt.slice(0, 10) : "",
          });
          setImagePreview(product.thumbnail || "");
        }
      } catch (error) {
        console.error("Load product failed", error);
      }
    };

    loadProduct();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        categoryId: Number(form.category_id),
        name: form.name,
        description: form.description,
        price: Number(form.price),
        thumbnail: form.thumbnail,
        quantity: Number(form.quantity),
        status: form.status,
        createdAt: form.createdAt,
      };

      await updateProduct(params.id, payload);
      router.push("/admin/product");
    } catch (error) {
      console.error("Update product failed", error);
      alert(error.message || "Không thể cập nhật sản phẩm trên backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Sản phẩm</p>
          <h1 className="text-2xl font-bold text-slate-800">Chỉnh sửa sản phẩm</h1>
        </div>
        <Link href="/admin/product" className="text-sm font-semibold text-blue-600 hover:underline">
          Quay lại
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            <span>Category ID</span>
            <input
              type="number"
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Tên sản phẩm</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
            <span>Mô tả</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="min-h-28 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Giá</span>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700 md:col-span-2">
            <span>Hình ảnh</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagePick}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 file:mr-3 file:rounded file:border-0 file:bg-amber-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-amber-700"
            />
            <input
              value={form.thumbnail}
              onChange={(e) => handleThumbnailChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Dán URL hình ảnh hoặc chọn ảnh từ máy"
            />
            {imagePreview ? (
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                <img src={imagePreview} alt="Preview" className="h-32 w-full rounded-lg object-cover" />
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-500">
                Chưa có ảnh được chọn
              </div>
            )}
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Số lượng</span>
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Trạng thái</span>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Ngày tạo</span>
            <input
              type="date"
              value={form.createdAt}
              onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button type="submit" className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
            Cập nhật
          </button>
          <Link href="/admin/product" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Hủy
          </Link>
        </div>
      </div>
    </form>
  );
}
