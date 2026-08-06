"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProducts } from "@/lib/api";

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
}

export default function ShowProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await getProducts();
        const found = products.find((item) => String(item.id) === String(params.id));
        setProduct(found || null);
      } catch (error) {
        console.error("Load product detail failed", error);
        setProduct(null);
      }
    };

    loadProduct();
  }, [params.id]);

  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        Không tìm thấy sản phẩm.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Sản phẩm</p>
          <h1 className="text-2xl font-bold text-slate-800">Chi tiết sản phẩm</h1>
        </div>
        <Link href="/admin/product" className="text-sm font-semibold text-blue-600 hover:underline">
          Quay lại danh sách
        </Link>
      </div>

      <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Tên sản phẩm</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{product.name}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Mô tả</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">{product.description || "Chưa có mô tả"}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Thông tin bán hàng</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>Giá: {formatPrice(product.price || 0)}</div>
              <div>Số lượng: {product.quantity || 0}</div>
              <div>Trạng thái: {product.status || "Active"}</div>
              <div>Ngày tạo: {product.createdAt || "-"}</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} className="h-56 w-full rounded-xl object-cover" />
          ) : (
            <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
              Chưa có hình ảnh
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
