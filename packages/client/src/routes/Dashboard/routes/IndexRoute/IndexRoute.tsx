import React from "react";
import { Link } from "react-router-dom";

import AdminMeta from "../../../Admin/meta";
import { HocAccessControl } from "../../../Auth/compounds/HocAccessControl";
import ProfileMeta from "../../../Auth/routes/Profile/meta";

const Component: React.FC = () => {
  return (
    <>
      <h1>Welcome to the dashboard!</h1>
      <ul>
        <HocAccessControl allowRoles={AdminMeta.allowRoles} hidden={true}>
          <li>
            <Link to={AdminMeta.path}>Goto Admin Dashboard</Link>
          </li>
        </HocAccessControl>
        <li>
          <Link to={ProfileMeta.path}>Goto Profile</Link>
        </li>
      </ul>
    </>
  );
};

export default Component;
