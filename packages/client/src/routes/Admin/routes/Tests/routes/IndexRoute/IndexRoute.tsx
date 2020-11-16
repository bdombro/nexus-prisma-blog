import React from "react";
import { Link } from "react-router-dom";

import DynamicRouteTestMeta from "../DynamicRouteTest/meta";
import ErrorBoundaryTest1Meta from "../ErrorBoundaryTest1/meta";
import ErrorBoundaryTest2Meta from "../ErrorBoundaryTest2/meta";
import HotReloadTestMeta from "../HotReloadTest/meta";
import PortalTestMeta from "../PortalTest/meta";
import ScrollRestoreTestMeta from "../ScrollRestoreTest/meta";

const Component: React.FC = () => {
  return (
    <>
      <div>Welcome to the dashboard!</div>
      <ul>
        <li>
          <Link to={DynamicRouteTestMeta.path}>Goto Dynamic Route Test</Link>
        </li>
        <li>
          <Link to={ErrorBoundaryTest1Meta.path}>Goto Error Boundary Test 1</Link>
        </li>
        <li>
          <Link to={ErrorBoundaryTest2Meta.path}>Goto Error Boundary Test 2</Link>
        </li>
        <li>
          <Link to={HotReloadTestMeta.path}>Goto HotReloadTest</Link>
        </li>
        <li>
          <Link to={PortalTestMeta.path}>Goto Portal Test</Link>
        </li>
        <li>
          <Link to={ScrollRestoreTestMeta.path}>Goto ScrollRestoreTest</Link>
        </li>
      </ul>
    </>
  );
};

export default Component;
