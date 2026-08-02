"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = () => {
    setLoading(true);
    fetch(`${API_URL}/Addresses`)
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách địa chỉ:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    if (confirm(`Bạn có chắc muốn xóa địa chỉ ID: ${id}?`)) {
      try {
        const response = await fetch(`${API_URL}/Addresses/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Xóa thành công!");
          fetchAddresses();
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
          <h1 className="text-2xl font-bold text-slate-800">Quản lý địa chỉ</h1>
          <p className="text-sm text-slate-600">Danh sách địa chỉ kết nối CSDL thật</p>
        </div>
        <Link
          href="/admin/address/add"
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
              <th className="px-4 py-3">UserId</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Ward</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Province</th>
              <th className="px-4 py-3">IsDefault</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="px-4 py-10 text-center text-slate-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : addresses.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-4 py-10 text-center text-slate-500">
                  Chưa có dữ liệu. Hãy thêm địa chỉ mới để bắt đầu.
                </td>
              </tr>
            ) : (
              addresses.map((addr) => (
                <tr key={addr.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-700">{addr.id}</td>
                  <td className="px-4 py-3">{addr.userId}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{addr.name}</td>
                  <td className="px-4 py-3">{addr.phone}</td>
                  <td className="px-4 py-3">{addr.address}</td>
                  <td className="px-4 py-3">{addr.ward}</td>
                  <td className="px-4 py-3">{addr.district}</td>
                  <td className="px-4 py-3">{addr.province}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        addr.active
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {addr.active ? "Mặc định" : "Thường"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/address/${addr.id}/show`} className="text-blue-600 hover:underline">
                        Xem
                      </Link>
                      <Link href={`/admin/address/${addr.id}/update`} className="text-amber-600 hover:underline">
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(addr.id)}
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
