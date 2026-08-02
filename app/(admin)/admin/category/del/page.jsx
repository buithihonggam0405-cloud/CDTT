export default function CategoryDelete() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-red-700">Xóa danh mục</h1>
      <p className="mt-2 text-sm text-slate-700">Bạn có chắc chắn muốn xóa danh mục này khỏi hệ thống?</p>
      <div className="mt-4 flex gap-3">
        <button className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">Xác nhận xóa</button>
        <button className="rounded border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100">Hủy</button>
      </div>
    </div>
  );
}
