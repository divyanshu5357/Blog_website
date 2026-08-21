import api from "./api";

export const getCurrentPublicUser = async (token) => {
  const publicToken = token || localStorage.getItem("publicToken");

  if (!publicToken) {
    throw new Error("Public authentication token not found.");
  }

  const res = await api.get("/public-auth/me", {
    headers: {
      Authorization: `Bearer ${publicToken}`,
    },
  });

  return res.data;
};