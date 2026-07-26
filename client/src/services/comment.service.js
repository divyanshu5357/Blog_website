import api from "./api";

export const createComment = async (comment) => {
  const token = localStorage.getItem("publicToken");

  const { data } = await api.post(
    "/comments",
    comment,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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
  const { data } = await api.get("/comments");

  return data;
};

export const deleteComment = async (id) => {
  const token = localStorage.getItem("publicToken");

  const { data } = await api.delete(
    `/comments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
export const updateComment = async (
  id,
  content
) => {

  const token =
    localStorage.getItem("publicToken");

  const { data } =
    await api.patch(
      `/comments/${id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return data;
};