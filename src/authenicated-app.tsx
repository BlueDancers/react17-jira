import { useAuth } from "./context/auth-context";
import ProjectList from "./pages/projectList";

/**
 *
 * @returns
 */
export function AuthenicatedApp() {
  const { logout } = useAuth();
  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        登出
      </button>
      <ProjectList></ProjectList>
    </div>
  );
}
