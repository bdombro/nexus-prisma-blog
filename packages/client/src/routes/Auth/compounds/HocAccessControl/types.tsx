import React from "react";

export type DefaultProps = {
  allowRoles?: string[];
  hidden?: boolean;
  children: React.ReactNode;
};
export type DefaultComponent = React.FC<DefaultProps>;
