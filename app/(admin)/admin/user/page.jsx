"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${API_URL}/Users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách user:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng với ID: ${id}?`)) {
      try {
        const response = await fetch(`${API_URL}/Users/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Xóa thành công!");
          fetchUsers();
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
          <h1 className="text-2xl font-bold text-slate-800">Quản lý người dùng</h1>
          <p className="text-sm text-slate-600">Trang quản lý người dùng kết nối CSDL thật</p>
        </div>
        <Link
          href="/admin/user/add"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Thêm người dùng
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">username</th>
              <th className="px-4 py-3">name</th>
              <th className="px-4 py-3">email</th>
              <th className="px-4 py-3">phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">CreatedAt</th>
              <th className="px-4 py-3">status</th>
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
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-10 text-center text-slate-500">
                  Chưa có dữ liệu người dùng. Hãy tạo mới để bắt đầu.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-700">{user.id}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : ""}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/user/${user.id}/show`} className="text-blue-600 hover:underline">
                        Xem
                      </Link>
                      <Link href={`/admin/user/${user.id}/update`} className="text-amber-600 hover:underline">
                        Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
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
