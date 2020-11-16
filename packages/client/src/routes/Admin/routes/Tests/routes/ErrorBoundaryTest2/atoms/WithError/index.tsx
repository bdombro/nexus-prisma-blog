import React from "react";

import { ErrorBoundary } from "../../../../../../../../layout/compounds/ErrorBoundary";
import Inner from "./WithError";

const Component = () => (
  <ErrorBoundary>
    <Inner />
  </ErrorBoundary>
);
export default Component;
