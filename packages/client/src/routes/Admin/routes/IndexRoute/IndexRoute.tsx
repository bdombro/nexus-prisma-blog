import React from "react";
import { Link } from "react-router-dom";

import TestsMeta from "../Tests/meta";
import UsersMeta from "../Users/meta";

const Component: React.FC = () => {
  return (
    <>
      <div>Welcome to the dashboard!</div>
      <ul>
        <li>
          <Link to={UsersMeta.path}>Goto Users</Link>
        </li>
        <li>
          <Link to={TestsMeta.path}>Goto Tests</Link>
        </li>
      </ul>
    </>
  );
};

export default Component;
