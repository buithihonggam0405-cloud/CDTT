"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/admin", label: "Trang chủ", icon: "🏠" },
  { href: "/admin/user", label: "Người dùng", icon: "👤" },
  { href: "/admin/address", label: "Địa chỉ", icon: "📍" },
  { href: "/admin/category", label: "Danh mục", icon: "🗂️" },
  { href: "/admin/product", label: "Sản phẩm", icon: "🛍️" },
  { href: "/admin/cart", label: "Giỏ hàng", icon: "🛒" },
  { href: "/admin/cartitem", label: "CartItem", icon: "🧾" },
  { href: "/admin/orders", label: "Đơn hàng", icon: "📦" },
  { href: "/admin/orderdetails", label: "Chi tiết đơn hàng", icon: "🧺" },
  { href: "/admin/payment", label: "Thanh toán", icon: "💳" },
  { href: "/admin/review", label: "Đánh giá", icon: "⭐" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        <aside className="w-72 bg-slate-900 p-6 text-white">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="mt-1 text-sm text-slate-400">Quản lý hệ thống</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">Xin chào, Admin</h1>
                <p className="text-sm text-slate-500">Quản lý người dùng, địa chỉ và danh mục</p>
              </div>
              <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                Online
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">{children}</main>

          <footer className="border-t border-slate-200 bg-white px-6 py-4 text-sm text-slate-500">
            © 2026 Admin Dashboard
          </footer>
        </div>
      </div>
    </div>
  );
}