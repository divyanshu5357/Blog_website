import { createContext, useContext, useState, useEffect } from "react";

const PublicUserContext = createContext(null);

export function PublicUserProvider({ children }) {
  const [publicUser, setPublicUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("publicUser");
    if (storedUser) {
      try {
        setPublicUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse publicUser from localStorage", err);
      }
    }
  }, []);

  const loginPublicUser = (userData) => {
    setPublicUser(userData);
    localStorage.setItem("publicUser", JSON.stringify(userData));
  };

  const logoutPublicUser = () => {
    setPublicUser(null);
    localStorage.removeItem("publicUser");
  };

  return (
    <PublicUserContext.Provider value={{ publicUser, setPublicUser, loginPublicUser, logoutPublicUser }}>
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
      try { user = JSON.parse(storedUser); } catch (e) {}
    }
    return { publicUser: user, setPublicUser: () => {} };
  }
  return context;
}
