import React from "react";
import { NavLink } from "react-router-dom";

import AdminMeta from "../../../../../../routes/Admin/meta";
import { HocAccessControl } from "../../../../../../routes/Auth/compounds/HocAccessControl";
import ProfileMeta from "../../../../../../routes/Auth/routes/Profile/meta";
import DashboardMeta from "../../../../../../routes/Dashboard/meta";
import PostsMeta from "../../../../../../routes/Posts/meta";
import { DefaultComponent } from "./types";

export const Component: DefaultComponent = () => {
  return (
    <div className="headerNav">
      <ul>
        <li>
          <NavLink to={DashboardMeta.path} activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={PostsMeta.path} activeClassName="active">
            Posts
          </NavLink>
        </li>
        <HocAccessControl allowRoles={AdminMeta.allowRoles} hidden={true}>
          <li>
            <NavLink to={AdminMeta.path} activeClassName="active">
              Admin
            </NavLink>
          </li>
        </HocAccessControl>
        <li>
          <NavLink to={ProfileMeta.path} activeClassName="active">
            User Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Component;
