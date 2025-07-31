const BASE_URL = 'https://fakestoreapi.com';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return handleResponse(res);
};

export const fetchProductById = async (id: string | number) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse(res);
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return handleResponse(res);
};

export const fetchProductsByCategory = async (category: string) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  return handleResponse(res);
};
