import React from "react";
import { PartialRouteObject } from "react-router";
import { Navigate, useRoutes } from "react-router-dom";

import Admin from "./Admin";
import AdminMeta from "./Admin/meta";
import Auth from "./Auth";
import AuthMeta from "./Auth/meta";
import Dashboard from "./Dashboard";
import DashboardMeta from "./Dashboard/meta";
import NotFound from "./NotFound";
import Posts from "./Posts";
import PostsMeta from "./Posts/meta";

const Component: React.FC = () => {
  const routes: PartialRouteObject[] = [
    { path: "/", element: <Navigate to={DashboardMeta.slug} replace /> },
    { path: DashboardMeta.slug + "/*", element: <Dashboard /> },
    { path: AuthMeta.slug + "/*", element: <Auth /> },
    { path: AdminMeta.slug + "/*", element: <Admin /> },
    { path: PostsMeta.slug + "/*", element: <Posts /> },
    { path: "*", element: <NotFound /> },
  ];
  return useRoutes(routes);
};
export default Component;

export type DefaultProps = {};
export type DefaultComponent = React.FC<DefaultProps>;
