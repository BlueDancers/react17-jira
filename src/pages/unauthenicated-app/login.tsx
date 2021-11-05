import { FormEvent, useEffect } from "react";
import { useAuth } from "../../context/auth-context";
import { Button, Form, Input } from "antd";
import { useAsync } from "../../utils/useAsync";

export default function LoginScreen() {
  const { login, user } = useAuth();
  const loginData = useAsync<any>();
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="请输入用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="text" id="password" />
      </Form.Item>
      <Form.Item>
        <Button loading={loginData.isLoading} htmlType="submit" type="primary">
          登录
        </Button>
      </Form.Item>
    </Form>
  );

  // function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   // 发起请求
  //   login({
  //     username,
  //     password,
  //   }).then((res) => {
  //     console.log(res, user);
  //   });
  // }

  function handleSubmit(values: { username: string; password: string }) {
    // 发起请求
    loginData.run(login({ ...values })).catch(() => {
      console.log(loginData);
    });
  }
}
