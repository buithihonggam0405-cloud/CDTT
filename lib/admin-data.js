export const STORAGE_KEYS = {
  products: "admin-products",
  carts: "admin-carts",
  cartItems: "admin-cart-items",
  orders: "admin-orders",
  orderDetails: "admin-order-details",
  payments: "admin-payments",
  reviews: "admin-reviews",
};

export function readItems(key, fallback = []) {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function writeItems(key, items) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function createId(items) {
  if (!Array.isArray(items) || items.length === 0) return 1;
  const ids = items.map((item) => Number(item.id) || 0);
  return Math.max(...ids) + 1;
}
