import React from "react";
import useMetaTags from "react-metatags-hook";
import { Link, useLocation } from "react-router-dom";

import { useAuthentication } from "../../state";
import loginMeta from "../Auth/routes/Login/meta";

const NotFound: React.FC = () => {
  const location = useLocation();
  const { state: authState, logout } = useAuthentication();
  useMetaTags({ title: `404 Note Found - Boilerplate` }, []);
  return (
    <>
      <h1>404: Not Found</h1>
      <div>
        The page you request is either non-existant or you don't have access.{" "}
        <Link to={`${loginMeta.path}?from=${location.pathname}`} onClick={logout}>
          {authState.userId ? "Switch user?" : "Login?"}
        </Link>
      </div>
    </>
  );
};

export default NotFound;
