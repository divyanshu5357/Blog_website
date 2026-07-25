import api from "./api";

export const createComment = async (comment) => {
  const { data } = await api.post(
    "/comments",
    comment
  );

  return data;
};

export const getComments = async (slug) => {
  const { data } = await api.get(
    `/comments/post/${slug}`
  );

  return data;
};

export const getAdminComments = async () => {
  const { data } = await api.get(
    "/comments"
  );

  return data;
};

export const approveComment = async (id) => {
  const { data } = await api.patch(
    `/comments/${id}/approve`
  );

  return data;
};

export const deleteComment = async (id) => {
  const { data } = await api.delete(
    `/comments/${id}`
  );

  return data;
};