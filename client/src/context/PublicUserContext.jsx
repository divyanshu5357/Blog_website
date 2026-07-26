import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/publicAuth.service";

const PublicUserContext = createContext();

export function PublicUserProvider({ children }) {
  const [publicUser, setPublicUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("publicToken");

    if (!token) {
      setPublicUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await getCurrentUser();

      setPublicUser(res.data);
    } catch (err) {
      localStorage.removeItem("publicToken");
      setPublicUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("publicToken");
    setPublicUser(null);
  };

  return (
    <PublicUserContext.Provider
      value={{
        publicUser,
        loading,
        fetchUser,
        logout,
      }}
    >
      {children}
    </PublicUserContext.Provider>
  );
}

export const usePublicUser = () => useContext(PublicUserContext);