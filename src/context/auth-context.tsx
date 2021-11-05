import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  login as loginFun,
  register as registerFun,
  logout as logoutFun,
  getToken,
} from "../auto-provider";
import { User } from "../pages/projectList/components/todoSearch";
import { useMount } from "../utils";
import { http } from "../utils/http";
import { useAsync } from "../utils/useAsync";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = getToken();
  if (token) {
    const data = await http("me", {
      token,
    });
    user = data.user;
  }
  return user;
};

const AuthContext = createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AutoContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userReq = useAsync<User | null>();
  function login(form: AuthForm) {
    return loginFun(form).then((res) => {
      console.log(res);
      userReq.setData(res);
    });
  }
  function register(form: AuthForm) {
    return registerFun(form).then((res) => {
      console.log(res);
      userReq.setData(res);
    });
  }
  function logout() {
    return logoutFun().then((res) => {
      userReq.setData(null);
    });
  }

  useMount(() => {
    userReq.run(bootstrapUser());
  });
  // 如果在加载状态
  if (userReq.isIdle || userReq.isLoading) {
    return <p>loading.....</p>;
  }

  if (userReq.isError) {
    return <p>失败了.....</p>;
  }
  // 真实的dom
  return (
    <AuthContext.Provider
      children={children}
      value={{
        user: userReq.data,
        login,
        register,
        logout,
      }}
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
