import "./style.css";

import React from "react";

import { ErrorBoundary } from "../../../compounds/ErrorBoundary";
import Loading from "./Loading";
import { DefaultComponent } from "./types";

const DefaultInner = React.lazy(() => import("./Breadcrumbs"));

const Default: DefaultComponent = (props) => {
  const { routeMeta } = props;
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Loading routeMeta={routeMeta} />}>
        <DefaultInner {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
};
export default Default;
