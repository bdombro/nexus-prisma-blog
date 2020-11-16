import React from "react";

import { RouteMeta } from "../../routes/types";

export type DefaultProps = {
  routeMeta: RouteMeta;
  children?: React.ReactNode;
};
export type DefaultComponent = React.FC<DefaultProps>;
