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

function test(a: string, b: number, c: number[], d: any) {}

// 直接继承test函数的全部参数类型
function testPlus(...[a, b, c, d]: Parameters<typeof test>) {
  console.log(a, b, c, d);
}

type Preson = {
  name: string;
  age: String;
  sex: string;
};

// Partial关键字会将传入的类型处理成为非必填
const xiaoMin: Partial<Preson> = {
  age: "非必填",
  name: "非必填",
  sex: "非必填",
};

const shenMiRen: Omit<Preson, "age" | "name"> = { sex: "男" };
