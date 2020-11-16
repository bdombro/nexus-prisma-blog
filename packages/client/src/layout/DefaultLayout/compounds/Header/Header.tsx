import React from "react";

import Nav from "./compounds/Nav";
import { DefaultComponent } from "./types";

const Component: DefaultComponent = () => {
  return (
    <div className="header">
      <Nav />
    </div>
  );
};
export default Component;
