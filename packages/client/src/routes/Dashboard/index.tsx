import React from "react";
import { PartialRouteObject } from "react-router";
import { useRoutes } from "react-router-dom";

import RouteAccessControl from "../Auth/compounds/RouteAccessControl";
import NotFound from "../NotFound";
import routeMeta from "./meta";
import IndexRoute from "./routes/IndexRoute";

const Component: React.FC = () => {
  const routes: PartialRouteObject[] = [
    { path: "/", element: <IndexRoute /> },
    { path: "*", element: <NotFound /> },
  ];
  return <RouteAccessControl routeMeta={routeMeta}>{useRoutes(routes)}</RouteAccessControl>;
};
export default Component;

export type DefaultProps = {};
export type DefaultComponent = React.FC<DefaultProps>;
