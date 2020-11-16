import React from "react";

import { useAuthentication } from "../../../../state/authentication";
import { DefaultComponent } from "./types";

export const HocAccessControl: DefaultComponent = (props) => {
  const { allowRoles = [], hidden = false, children } = props;
  const { state: authState } = useAuthentication();
  const hasAccess = authState.roles.includes("ADMIN") || allowRoles.find((r) => authState.roles.includes(r));
  if (!hasAccess) {
    console.debug(`HocAccessControl: Blocked`);
    if (hidden) return <></>;
    return <>Section Unavailable to Your User</>;
  }
  return <>{children}</>;
};
