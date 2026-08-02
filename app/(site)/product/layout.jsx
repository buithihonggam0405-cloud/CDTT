export default function ProductLayout({ children }) {
  return (
    <div className="product-container">
      {/* Giao diện khung riêng cho các trang Product (nếu có) */}
      {children}
    </div>
  );
}