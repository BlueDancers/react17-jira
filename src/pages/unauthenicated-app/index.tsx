import { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

export function UnAuthenicated() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? (
        <LoginScreen></LoginScreen>
      ) : (
        <RegisterScreen></RegisterScreen>
      )}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
}
