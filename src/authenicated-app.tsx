import styled from "@emotion/styled";
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
      <PageHeader>
        <button onClick={logout}>登出</button>
      </PageHeader>
      <Main>
        <ProjectList></ProjectList>
      </Main>
    </div>
  );
}

const PageHeader = styled.header`
  height: 6rem;
`;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
