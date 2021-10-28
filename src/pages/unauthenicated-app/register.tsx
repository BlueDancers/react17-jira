import { FormEvent, useEffect } from "react";
import { useAuth } from "../../context/auth-context";

const Url = process.env.REACT_APP_API_URL;
export default function RegisterScreen() {
  const { register, user } = useAuth();
  return (
    <form onSubmit={handleSubmit}>
      {user && <div>登录成功,欢迎你{user?.name} </div>}

      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id="password" />
      </div>
      <button>注册</button>
    </form>
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    // 发起请求
    register({
      username,
      password,
    }).then((res) => {
      console.log(res, user);
    });
    // fetch(`${Url}/register`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password,
    //   }),
    // })
    //   .then(async (res) => {
    //     if (res.ok) {
    //       let data = await res.json();
    //       console.log(data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
