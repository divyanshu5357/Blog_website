import api from "./api";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("publicToken");

  const res = await api.get("/public-auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};