export default function AddressAdd() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800">Thêm địa chỉ mới</h1>
      <p className="mt-2 text-sm text-slate-600">Nhập thông tin địa chỉ theo cấu trúc dữ liệu mới</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">UserID</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập UserID" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập tên người nhận" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập số điện thoại" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Isdefault</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="true/false" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">AddressLine</label>
          <textarea className="w-full rounded border border-slate-300 px-3 py-2" rows="3" placeholder="Nhập địa chỉ chi tiết" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Ward</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập phường/xã" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">District</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập quận/huyện" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Province</label>
          <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Nhập tỉnh/thành" />
        </div>
      </div>
      <button className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Lưu</button>
    </div>
  );
}
