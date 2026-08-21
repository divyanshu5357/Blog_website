import api from "./api";

export const getCurrentPublicUser = async (explicitToken) => {
  const token = explicitToken || localStorage.getItem("publicToken");

  if (!token) return null;

  const { data } = await api.get("/public-auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};