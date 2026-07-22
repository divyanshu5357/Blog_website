import api from "./api";

export const getPosts = async (params = {}) => {
  const { data } = await api.get("/posts", { params });
  return data;
};

export const getPost = async (id) => {
  const { data } = await api.get(`/posts/${id}`);
  return data;
};

export const createPost = async (postData) => {
  const { data } = await api.post("/posts", postData);
  return data;
};

export const updatePost = async (id, postData) => {
  const { data } = await api.put(`/posts/${id}`, postData);
  return data;
};


export const deletePost = async (id) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};

export const publishPost = async (id) => {
  const { data } = await api.patch(`/posts/${id}/publish`);
  return data;
};

export const draftPost = async (id) => {
  const { data } = await api.patch(`/posts/${id}/draft`);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};
export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const { data } = await api.post(
    "/uploads/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};