//services/api.ts

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${url}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers as Record<string, string> },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}

function formRequest<T>(url: string, body: FormData, method = 'POST'): Promise<T> {
  return fetch(`/api${url}`, {
    method,
    credentials: 'include',
    body,
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(err.message || `Error ${res.status}`);
    }
    return res.json();
  });
}

// Auth
export const registerUser = (data: object) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
export const loginUser = (data: object) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(data) });
export const logoutUser = () =>
  request('/auth/logout', { method: 'POST' });
export const getSession = () =>
  request<{ user: any } | null>('/auth/session');

// Shop — GET /api/shop returns the shop + _id; we then use shopId
export const getMyShop = () => request('/pharmacy/shop');
export const createShop = (data: FormData) => formRequest('/pharmacy/shop/create', data);
export const updateShop = (shopId: string, data: FormData) =>
  formRequest(`/pharmacy/shop/${shopId}/update`, data, 'PUT');

// Products — from shopId: /api/shop/{shopId}/product/...
export const getShopProducts = (shopId: string, params = '') =>
  request(`/pharmacy/shop/${shopId}/product${params ? '?' + params : ''}`);
export const getAllMedicine = (shopId: string, params = '') =>
  request(`/pharmacy/shop/${shopId}/all-medicine${params ? '?' + params : ''}`);
export const addProduct = (shopId: string, data: FormData) =>
  formRequest(`/pharmacy/shop/${shopId}/product/add`, data);
export const editProduct = (shopId: string, productId: string, data: FormData) =>
  formRequest(`/pharmacy/shop/${shopId}/product/${productId}/edit`, data, 'PUT');
export const deleteProduct = (shopId: string, productId: string) =>
  request(`/pharmacy/shop/${shopId}/product/${productId}/delete`, { method: 'DELETE' });
export const addToShop = (shopId: string, productId: string) =>
  request(`/pharmacy/shop/${shopId}/product/${productId}/add-to-shop`, { method: 'POST' });
export const getProductDetail = (shopId: string, productId: string, params = '') =>
  request(`/pharmacy/shop/${shopId}/product/${productId}${params ? '?' + params : ''}`);

// Statistics
export const getStatistics = () => request('/pharmacy/statistics');
export const getClientGoods = (id: string) => request(`/pharmacy/statistics/${id}/goods`);
