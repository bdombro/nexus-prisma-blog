import React from "react";

import DefaultLayout from "../../../../layout/DefaultLayout";
import RouteAccessControl from "../../../Auth/compounds/RouteAccessControl";
import Loading from "./Loading";
import routeMeta from "./meta";

const Loaded = React.lazy(() => import("./Profile"));

const Component: React.FC = () => (
  <RouteAccessControl routeMeta={routeMeta}>
    <DefaultLayout routeMeta={routeMeta}>
      <React.Suspense fallback={<Loading />}>
        <Loaded />
      </React.Suspense>
    </DefaultLayout>
  </RouteAccessControl>
);
export default Component;
