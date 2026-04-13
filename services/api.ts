//services/api.ts

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

function formRequest<T>(
  url: string,
  body: FormData,
  method = "POST",
): Promise<T> {
  return fetch(`/api${url}`, {
    method,
    credentials: "include",
    body,
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Request failed" }));
      throw new Error(err.message || `Error ${res.status}`);
    }
    return res.json();
  });
}

// ============ Auth ============
export const registerUser = (data: object) =>
  request("/auth/register", { method: "POST", body: JSON.stringify(data) });
export const loginUser = (data: object) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(data) });
export const logoutUser = () => request("/auth/logout", { method: "POST" });
export const getSession = () => request<{ user: any } | null>("/auth/session");

// ============ Shop (бекенд знаходить shop по userId з токена) ============
export const getMyShop = () => request("/pharmacy/shop");
export const createShop = (data: FormData) =>
  formRequest("/pharmacy/shop/create", data);
export const updateShop = (data: FormData) =>
  formRequest("/pharmacy/shop/update", data, "PUT");

// ============ Products (без shopId — бекенд використовує userId) ============
export const getShopProducts = (params = "") =>
  request(`/pharmacy/shop/products${params ? "?" + params : ""}`);
export const getAllMedicine = (params = "") =>
  request(`/pharmacy/shop/all-medicine${params ? "?" + params : ""}`);
export const addProduct = (data: FormData) =>
  formRequest("/pharmacy/shop/products/add", data);
export const editProduct = (productId: string, data: FormData) =>
  formRequest(`/pharmacy/shop/products/${productId}/edit`, data, "PUT");
export const deleteProduct = (productId: string) =>
  request(`/pharmacy/shop/products/${productId}/delete`, { method: "DELETE" });
export const addToShop = (productId: string) =>
  request(`/pharmacy/shop/products/${productId}/add-to-shop`, {
    method: "POST",
  });
export const getProductDetail = (productId: string, params = "") =>
  request(`/pharmacy/shop/products/${productId}${params ? "?" + params : ""}`);

// ============ Statistics ============
export const getStatistics = () => request("/pharmacy/statistics");
export const getClientGoods = (id: string) =>
  request(`/pharmacy/statistics/${id}/goods`);
