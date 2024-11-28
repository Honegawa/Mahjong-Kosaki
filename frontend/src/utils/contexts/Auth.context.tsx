import axios, { AxiosResponse } from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
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

  const isAuthenticated = useCallback(async () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parseData = JSON.parse(userData);

      try {
        const response: AxiosResponse = await axios.get(
          `${ENDPOINTS.PERSON}/${parseData.id}`
        );
        const { status } = response;

        if (status === 200) {
          setUser(parseData);
        }
      } catch (error) {
        localStorage.removeItem("userData");
      }
    }
  }, []);

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

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

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  const updateUser = (dataForm: UserUpdate) => {
    if (user) {
      const newUser = { ...user, ...dataForm };
      setUser(newUser);
      localStorage.setItem("userData", JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
