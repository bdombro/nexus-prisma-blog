import React from "react";

export type DefaultProps = {
  colors?: { background?: string; pulse?: string };
  width?: number | string;
  height?: number | string;
  center?: boolean;
  circle?: boolean;
  count?: number;
  marginBottom?: number | string;
  classes?: string;
};
export type DefaultComponent = React.FC<DefaultProps>;
