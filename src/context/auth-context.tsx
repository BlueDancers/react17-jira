import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  login as loginFun,
  register as registerFun,
  logout as logoutFun,
} from "../auto-provider";
import { User } from "../pages/projectList/components/todoSearch";

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = createContext<any>(undefined);

// const AuthContext = createContext<
//   | {
//       user: User | null;
//       register: (form: AuthForm) => Promise<void>;
//       login: (form: AuthForm) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);

AuthContext.displayName = "AutoContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  function login(form: AuthForm) {
    return loginFun(form).then((res) => {
      console.log(res);
      setUser(res);
    });
  }
  function register(form: AuthForm) {
    return registerFun(form).then((res) => {
      console.log(res);
      setUser(res);
    });
  }
  function logout() {
    return logoutFun().then((res) => {
      setUser(null);
    });
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
}
