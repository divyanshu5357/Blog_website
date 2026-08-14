import api from "./api";

export const getCurrentPublicUser = async () => {
  const token = localStorage.getItem("publicToken");

  const { data } = await api.get("/public-auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};