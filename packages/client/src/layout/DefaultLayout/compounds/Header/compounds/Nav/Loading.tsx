import React from "react";

import LoadingSkeleton from "../../../../../../molecules/LoadingSkeleton/LoadingSkeleton";
import { DefaultComponent } from "./types";

const Component: DefaultComponent = () => (
  <div className="headerNav">
    <LoadingSkeleton width={300} />
  </div>
);
export default Component;
