"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProduct, getCategories } from "@/lib/api";

export default function AddProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    thumbnail: "",
    quantity: "",
    status: "Active",
    createdAt: new Date().toISOString().slice(0, 10),
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
      setForm({
        ...form,
        thumbnail: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        ...form,
        category_id: Number(form.category_id),
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      alert("Thêm sản phẩm thành công!");

      router.push("/admin/product");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Thêm sản phẩm
          </h1>
          <p className="text-slate-500 mt-1">
            Nhập thông tin sản phẩm mới
          </p>
        </div>

        <Link
          href="/admin/product"
          className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
        >
          Quay lại
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white shadow-lg border p-8"
      >
        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block font-medium mb-2">
              Danh mục
            </label>

            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  category_id: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option value="">
                Chọn danh mục
              </option>

              {categories.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Tên sản phẩm
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-2">
              Mô tả
            </label>

            <textarea
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 resize-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Giá bán
            </label>

            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Số lượng
            </label>

            <input
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Trạng thái
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Ngày tạo
            </label>

            <input
              type="date"
              value={form.createdAt}
              onChange={(e) =>
                setForm({
                  ...form,
                  createdAt: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-2">
              Hình ảnh
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          {preview && (
            <div className="col-span-2">
              <img
                src={preview}
                className="h-64 rounded-xl border object-cover"
                alt=""
              />
            </div>
          )}

        </div>

        <div className="mt-8 flex gap-4">

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Lưu sản phẩm
          </button>

          <Link
            href="/admin/product"
            className="rounded-lg border border-slate-300 px-8 py-3 hover:bg-slate-100"
          >
            Hủy
          </Link>

        </div>

      </form>

    </div>
  );
}