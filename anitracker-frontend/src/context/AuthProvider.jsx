import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider rendering');
  const [auth, setAuth] = useState({});

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth && typeof parsedAuth === 'object') {
          setAuth(parsedAuth);
        }
      }
    } catch (error) {
      console.error('Error parsing stored auth:', error);
      localStorage.removeItem("auth");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
