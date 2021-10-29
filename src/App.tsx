import { AuthenicatedApp } from "./authenicated-app";
import { useAuth } from "./context/auth-context";
import { UnAuthenicated } from "./pages/unauthenicated-app";
import "./App.css";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">{user ? <AuthenicatedApp /> : <UnAuthenicated />}</div>
  );
}

export default App;
