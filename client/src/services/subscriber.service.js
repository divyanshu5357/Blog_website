import api from "./api";

export const subscribe = async (email) => {
  const response = await api.post("/subscribers", {
    email,
  });

  return response.data;
};

export const getSubscribers = async () => {
  const response = await api.get("/subscribers");

  return response.data;
};

export const deleteSubscriber = async (id) => {
  const response = await api.delete(`/subscribers/${id}`);

  return response.data;
};