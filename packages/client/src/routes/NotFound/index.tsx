import React from "react";

import BlankLayout from "../../layout/BlankLayout";
import DefaultLayout from "../../layout/DefaultLayout";
import { useAuthentication } from "../../state";
import RouteAccessControl from "../Auth/compounds/RouteAccessControl";
import Loading from "./Loading";
import routeMeta from "./meta";

const Loaded = React.lazy(() => import("./NotFound"));

const Component: React.FC = () => {
  const { state: authState } = useAuthentication();
  let Layout = authState.userId ? DefaultLayout : BlankLayout;
  return (
    <RouteAccessControl routeMeta={routeMeta}>
      <Layout routeMeta={routeMeta}>
        <React.Suspense fallback={<Loading />}>
          <Loaded />
        </React.Suspense>
      </Layout>
    </RouteAccessControl>
  );
};
export default Component;
