import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentPublicUser } from "../services/public-auth.service";

const PublicUserContext = createContext(null);

export const sanitizeRedirectUrl = (url) => {
  if (!url || typeof url !== "string") return "/";
  const trimmed = url.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.includes("/google-success")) {
    return trimmed;
  }
  return "/";
};

export function PublicUserProvider({ children }) {
  const [publicUser, setPublicUser] = useState(() => {
    const storedUser = localStorage.getItem("publicUser");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.error("Failed to parse publicUser from localStorage", err);
      }
    }
    return null;
  });

  const fetchPublicUser = async (explicitToken) => {
    const token = explicitToken || localStorage.getItem("publicToken");
    if (!token) {
      setPublicUser(null);
      localStorage.removeItem("publicUser");
      localStorage.removeItem("publicToken");
      return null;
    }

    try {
      const res = await getCurrentPublicUser(token);
      if (res && res.data) {
        setPublicUser(res.data);
        localStorage.setItem("publicUser", JSON.stringify(res.data));
        return res.data;
      }
    } catch (err) {
      console.error("Error verifying public user session:", err);
      logoutPublicUser();
    }
    return null;
  };

  useEffect(() => {
    const token = localStorage.getItem("publicToken");
    if (token) {
      fetchPublicUser(token);
    }
  }, []);

  const loginPublicUser = (userData) => {
    setPublicUser(userData);
    localStorage.setItem("publicUser", JSON.stringify(userData));
  };

  const logoutPublicUser = () => {
    setPublicUser(null);
    localStorage.removeItem("publicUser");
    localStorage.removeItem("publicToken");
  };

  return (
    <PublicUserContext.Provider
      value={{
        publicUser,
        setPublicUser,
        loginPublicUser,
        logoutPublicUser,
        fetchPublicUser,
      }}
    >
      {children}
    </PublicUserContext.Provider>
  );
}

export function usePublicUser() {
  const context = useContext(PublicUserContext);
  if (!context) {
    const storedUser = localStorage.getItem("publicUser");
    let user = null;
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {}
    }
    return { publicUser: user, setPublicUser: () => {}, loginPublicUser: () => {}, logoutPublicUser: () => {}, fetchPublicUser: async () => {} };
  }
  return context;
}
