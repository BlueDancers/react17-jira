import { AuthenicatedApp } from "./authenicated-app";
import { useAuth } from "./context/auth-context";
import { UnAuthenicated } from "./pages/unauthenicated-app";
import "./App.css";
import { ErrorBoundary } from "./components/error-boundary";
import { fallPageErrorFallback } from "./components/lib";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={fallPageErrorFallback}>
        {user ? <AuthenicatedApp /> : <UnAuthenicated />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
