import styled from "@emotion/styled";
import { Button, Card, Divider } from "antd";
import { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

export function UnAuthenicated() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container>
      <Button
        onClick={() => {
          throw new Error("啊哈哈哈");
        }}
      >
        抛出异常
      </Button>
      <CardCont>
        {isRegister ? (
          <RegisterScreen></RegisterScreen>
        ) : (
          <LoginScreen></LoginScreen>
        )}
        <Divider />
        <Button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </Button>
      </CardCont>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const CardCont = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
