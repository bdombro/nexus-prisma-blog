import React from "react";

import { DefaultComponent } from "./types";

export const Component: DefaultComponent = (props) => {
  const { name, labelText, error, inputRef, ...inputProps } = props;
  return (
    <div className={`textField ${error && "hasError"}`}>
      <label htmlFor={name}>{labelText}</label>
      <input type="text" name={name} {...inputProps} ref={inputRef} />
      <div className="error">{error}</div>
    </div>
  );
};
export default Component;
