import React from "react";
import { Link } from "react-router-dom";

import IdRouteMeta from "../[id]/meta";

const IndexRoute: React.FC = () => {
  return (
    <>
      <div>Welcome to Dynamic Route Test!</div>
      <ul>
        <li>
          <Link to={`${IdRouteMeta.path.replace(":id", "")}1`}>Goto Entry 1</Link>
        </li>
        <li>
          <Link to={`${IdRouteMeta.path.replace(":id", "")}2`}>Goto Entry 2 (hidden)</Link>
        </li>
      </ul>
    </>
  );
};

export default IndexRoute;
