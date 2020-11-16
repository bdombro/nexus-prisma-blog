import React from "react";
import { PartialRouteObject } from "react-router";
import { Navigate, useRoutes } from "react-router-dom";

import NotFound from "../NotFound";
import RouteAccessControl from "./compounds/RouteAccessControl";
import routeMeta from "./meta";
import ForgotPassword from "./routes/ForgotPassword";
import ForgotPasswordMeta from "./routes/ForgotPassword/meta";
import Login from "./routes/Login";
import LoginMeta from "./routes/Login/meta";
import Logout from "./routes/Logout/Logout";
import LogoutMeta from "./routes/Logout/meta";
import Profile from "./routes/Profile";
import ProfileMeta from "./routes/Profile/meta";
import Register from "./routes/Register";
import RegisterMeta from "./routes/Register/meta";

const Component: React.FC = () => {
  const routes: PartialRouteObject[] = [
    { path: "/", element: <Navigate to={ProfileMeta.slug} replace /> },
    { path: ForgotPasswordMeta.slug + "/*", element: <ForgotPassword /> },
    { path: LoginMeta.slug + "/*", element: <Login /> },
    { path: LogoutMeta.slug + "/*", element: <Logout /> },
    { path: RegisterMeta.slug + "/*", element: <Register /> },
    { path: ProfileMeta.slug + "/*", element: <Profile /> },
    { path: "*", element: <NotFound /> },
  ];
  return <RouteAccessControl routeMeta={routeMeta}>{useRoutes(routes)}</RouteAccessControl>;
};
export default Component;

export type DefaultProps = {};
export type DefaultComponent = React.FC<DefaultProps>;
