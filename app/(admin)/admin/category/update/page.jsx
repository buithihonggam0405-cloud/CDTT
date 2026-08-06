export default function CategoryUpdate() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800">Cập nhật danh mục</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập tên danh mục" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">slug</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="slug-cua-danh-muc" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">parentid</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập parentid" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">sort_order</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập sort_order" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">status</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập status" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea className="w-full rounded border border-slate-300 px-3 py-2" rows="4" placeholder="Nhập mô tả danh mục" />
        </div>
      </div>
      <button className="mt-6 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">Cập nhật</button>
    </div>
  );
}
