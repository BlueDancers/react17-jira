import { FormEvent } from "react";

const Url = process.env.REACT_APP_API_URL;
export default function LoginScreen() {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id="password" />
      </div>
      <button>登录</button>
    </form>
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    // 发起请求
    fetch(`${Url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
