import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../../../../state/authentication";
import { wait } from "../../../../util/wait";
import LoginMeta from "../Login/meta";

const Logout: Logout = () => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  React.useEffect(() => {
    logout();
    wait(1000).then(() => navigate(LoginMeta.path));
  }, [logout, navigate]);
  return (
    <>
      <div>You have been logged out. Redirecting to login...</div>
    </>
  );
};
export default Logout;

export type LogoutProps = {};
export type Logout = React.FC<LogoutProps>;
