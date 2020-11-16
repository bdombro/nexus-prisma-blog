import React from "react";

import { ErrorBoundary } from "../compounds/ErrorBoundary";
import LoadingLayout from "../LoadingLayout";
import { DefaultComponent } from "./types";

const DefaultInner = React.lazy(() => import("./BlankLayout"));

const Default: DefaultComponent = (props) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingLayout variant="outer" percentLoaded={66} />}>
        <DefaultInner {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
};
export default Default;
