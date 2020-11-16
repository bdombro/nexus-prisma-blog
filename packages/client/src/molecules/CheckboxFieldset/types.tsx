import React from "react";

export interface DefaultProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelText: string;
  error: string | undefined;
  inputRef: React.Ref<HTMLInputElement>;
}
export type DefaultComponent = React.FC<DefaultProps>;
