import React from "react";

import BlankLayout from "../../../../layout/BlankLayout";
import RouteAccessControl from "../../../Auth/compounds/RouteAccessControl";
import Loading from "./Loading";
import routeMeta from "./meta";

const Loaded = React.lazy(() => import("./ForgotPassword"));

const Component: React.FC = () => (
  <RouteAccessControl routeMeta={routeMeta}>
    <BlankLayout routeMeta={routeMeta}>
      <React.Suspense fallback={<Loading />}>
        <Loaded />
      </React.Suspense>
    </BlankLayout>
  </RouteAccessControl>
);
export default Component;
