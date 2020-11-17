import React from "react";

import { UserRole } from "../../../../__generated__/globalTypes";
import { useAuthentication } from "../../../../state/authentication";
import { DefaultComponent } from "./types";

export const HocAccessControl: DefaultComponent = (props) => {
  const { allowRoles = [], hidden = false, children } = props;
  const { state: authState } = useAuthentication();
  const hasAccess = authState.roles.includes(UserRole.ADMIN) || allowRoles.find((r) => authState.roles.includes(r));
  if (!hasAccess) {
    console.debug(`HocAccessControl: Blocked`);
    if (hidden) return <></>;
    return <>Section Unavailable to Your User</>;
  }
  return <>{children}</>;
};
