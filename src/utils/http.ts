import qs from "qs";
import { logout } from "../auto-provider";
import { useAuth } from "../context/auth-context";

const Url = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export async function http(
  url: string,
  { data, token, headers, ...customConfig }: Config = {}
) {
  let config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() == "GET") {
    url += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return fetch(`${Url}/${url}`, config).then(async (res) => {
    if (res.status === 401) {
      await logout();
      window.location.reload();
      return Promise.reject("登录失效");
    } else {
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  });
}

// 关键字 Parameters 获取函数的全部参数类型，以 元组类型 返回：
export function useHttp() {
  const { user } = useAuth();
  return (...[url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token });
}
