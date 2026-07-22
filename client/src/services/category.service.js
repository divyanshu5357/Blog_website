import api from "./api";

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post("/categories", data);

  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await api.put(`/categories/${id}`, data);

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);

  return response.data;
};
export const getPublicCategories = async () => {
  const { data } = await api.get("/categories/public");

  return data;
};
export const getCategoryPosts = async (slug) => {
  const { data } = await api.get(`/categories/${slug}/posts`);
  return data;
};
export const getCategory = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};
