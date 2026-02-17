const API_BASE = "http://localhost:5001/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed: ${response.status}`);
  }

  return payload;
}

export function getDashboardSummary() {
  return request("/dashboard/summary");
}

export function getProducts() {
  return request("/products");
}

export function createProduct(productData) {
  return request("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });
}

export function getMovements() {
  return request("/movements");
}

export function createMovement(movementData) {
  return request("/movements", {
    method: "POST",
    body: JSON.stringify(movementData),
  });
}
