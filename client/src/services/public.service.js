import api from "./api";

export const getFeaturedPosts = async () => {
  const { data } = await api.get("/posts/public/featured");
  return data;
};

export const getPublishedCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export const getBlogBySlug = async (
  slug,
  language = "en"
) => {
  const { data } = await api.get(
    `/posts/slug/${slug}?lang=${language}`
  );

  return data;
};
export const likeBlog = async (slug) => {
  const { data } = await api.post(
    `/posts/slug/${slug}/like`
  );

  return data;
};