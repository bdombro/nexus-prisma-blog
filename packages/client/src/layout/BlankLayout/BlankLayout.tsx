import React from "react";
import useMetaTags from "react-metatags-hook";

import { ErrorBoundary } from "../compounds/ErrorBoundary";
import { useScrollRestore } from "../useScrollRestore";
import { DefaultComponent } from "./types";

const Component: DefaultComponent = (props) => {
  const { routeMeta, children } = props;
  useMetaTags({ title: `${routeMeta.title} - Boilerplate` }, []);
  useScrollRestore("#scroll-div");
  return (
    <div className={`layout-blank ${routeMeta.slug}`} id="scroll-div" style={{ height: "100vh", overflowY: "scroll" }}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
};
export default Component;
