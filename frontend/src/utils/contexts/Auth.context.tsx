import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  AuthContextType,
  User,
  UserLogin,
  UserUpdate,
} from "../../interfaces/user";

import ENDPOINTS from "../contants/endpoints";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    isAuthenticated();
  }, []);

  const login = async (dataForm: UserLogin) => {
    let isLogged = false;
    try {
      const response = await axios.post(
        `${ENDPOINTS.PERSON}/signin`,
        dataForm,
        { withCredentials: true }
      );
      const { data, status } = response;

      if (status === 200) {
        setUser(data);
        isLogged = true;
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      isLogged = false;
    }

    return isLogged;
  };

  const isAuthenticated = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  const updateUser = (dataForm: UserUpdate) => {
    if (user) {
      const newUser = { ...user, ...dataForm };
      setUser(newUser)
      localStorage.setItem("userData", JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
