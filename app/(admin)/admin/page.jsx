const stats = [
  { value: "150", label: "CHUYÊN MỤC", color: "bg-cyan-600", icon: "🗂️" },
  { value: "53%", label: "BÀI VIẾT", color: "bg-emerald-600", icon: "📄" },
  { value: "44", label: "THÀNH VIÊN", color: "bg-amber-500", icon: "👤" },
  { value: "65", label: "BÌNH LUẬN", color: "bg-rose-600", icon: "💬" },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Trang chủ</p>
            <h1 className="text-3xl font-bold text-slate-900">Admin</h1>
          </div>
          <div className="text-sm text-slate-500">Home / Admin</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className={`rounded-xl ${item.color} p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/80">{item.label}</p>
              </div>
              <div className="text-4xl">{item.icon}</div>
            </div>
            <div className="mt-6 rounded-lg bg-white/10 px-3 py-3 text-sm text-white/80">
              Chi tiết →
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Biểu đồ nhỏ</h2>
              <p className="text-sm text-slate-500">Tổng quan ngắn gọn</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">Live</span>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl bg-slate-50 p-4">
            <svg viewBox="0 0 320 120" className="h-44 w-full">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M10 90 C60 70, 100 40, 150 50 S240 110, 300 80" fill="url(#chartGradient)" stroke="transparent" />
              <path d="M10 90 C60 70, 100 40, 150 50 S240 110, 300 80" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
              <circle cx="10" cy="90" r="4" fill="#2563eb" />
              <circle cx="150" cy="50" r="4" fill="#2563eb" />
              <circle cx="300" cy="80" r="4" fill="#2563eb" />
            </svg>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Số liệu nhanh</h2>
          <div className="mt-4 grid gap-3">
            {stats.slice(0, 2).map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

