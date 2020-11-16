import React from "react";
import { PartialRouteObject } from "react-router";
import { useRoutes } from "react-router-dom";

import RouteAccessControl from "../../../Auth/compounds/RouteAccessControl";
import NotFound from "../../../NotFound";
import routeMeta from "./meta";
import DynamicRouteTest from "./routes/DynamicRouteTest";
import DynamicRouteTestMeta from "./routes/DynamicRouteTest/meta";
import ErrorBoundaryTest from "./routes/ErrorBoundaryTest1";
import ErrorBoundaryTestMeta from "./routes/ErrorBoundaryTest1/meta";
import ErrorBoundaryTest2 from "./routes/ErrorBoundaryTest2";
import ErrorBoundaryTest2Meta from "./routes/ErrorBoundaryTest2/meta";
import HotReloadTest from "./routes/HotReloadTest";
import HotReloadTestMeta from "./routes/HotReloadTest/meta";
import IndexRoute from "./routes/IndexRoute";
import PortalTest from "./routes/PortalTest";
import PortalTestMeta from "./routes/PortalTest/meta";
import ScrollRestoreTest from "./routes/ScrollRestoreTest";
import ScrollRestoreTestMeta from "./routes/ScrollRestoreTest/meta";

const Component: React.FC = () => {
  const routes: PartialRouteObject[] = [
    { path: "/", element: <IndexRoute /> },
    { path: ErrorBoundaryTestMeta.slug + "/*", element: <ErrorBoundaryTest /> },
    { path: ErrorBoundaryTest2Meta.slug + "/*", element: <ErrorBoundaryTest2 /> },
    { path: HotReloadTestMeta.slug + "/*", element: <HotReloadTest /> },
    { path: DynamicRouteTestMeta.slug + "/*", element: <DynamicRouteTest /> },
    { path: PortalTestMeta.slug + "/*", element: <PortalTest /> },
    { path: ScrollRestoreTestMeta.slug + "/*", element: <ScrollRestoreTest /> },
    { path: "*", element: <NotFound /> },
  ];
  return <RouteAccessControl routeMeta={routeMeta}>{useRoutes(routes)}</RouteAccessControl>;
};
export default Component;

export type DefaultProps = {};
export type DefaultComponent = React.FC<DefaultProps>;
