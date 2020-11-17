import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { UserRole } from "../../../../__generated__/globalTypes";
import { useAuthentication } from "../../../../state/authentication";
import NotFound from "../../../NotFound";
import LoginMeta from "../../routes/Login/meta";
import { DefaultComponent } from "./types";

const Component: DefaultComponent = (props) => {
  const {
    routeMeta: { allowRoles, hidden = false },
    children,
  } = props;
  const { state: authState } = useAuthentication();
  const location = useLocation();
  const hasAccess =
    !allowRoles || authState.roles.includes(UserRole.ADMIN) || allowRoles.find((r) => authState.roles.includes(r));
  if (!hasAccess) {
    console.debug(`RouteAccessControl: Blocked`);
    if (hidden || authState.userId) return <NotFound />;
    return <Navigate to={`${LoginMeta.path}?from=${location.pathname}`} />;
  }
  return <>{children}</>;
};
export default Component;
