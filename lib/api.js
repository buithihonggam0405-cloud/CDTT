export const API_URL = "http://localhost:5210/api";

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed (${response.status}): ${
        errorText || response.statusText
      }`
    );
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

/* =======================
   PRODUCT API
======================= */

export async function getProducts() {
  return requestJson("/Products");
}

export async function createProduct(payload) {
  return requestJson("/Products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateProduct(id, payload) {
  return requestJson(`/Products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteProduct(id) {
  return requestJson(`/Products/${id}`, {
    method: "DELETE",
  });
}

/* =======================
   CATEGORY API
======================= */

export async function getCategories() {
  return requestJson("/Categories");
}

export async function createCategory(payload) {
  return requestJson("/Categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateCategory(id, payload) {
  return requestJson(`/Categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(id) {
  return requestJson(`/Categories/${id}`, {
    method: "DELETE",
  });
}