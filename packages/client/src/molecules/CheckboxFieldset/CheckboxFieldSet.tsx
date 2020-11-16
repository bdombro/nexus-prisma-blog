import React from "react";

import { DefaultComponent } from "./types";

export const Component: DefaultComponent = (props) => {
  const { name, labelText, type, error, inputRef, ...inputProps } = props;
  const id = React.useMemo(() => `${Math.abs(Math.random() * 1000)}`, []);
  function toggleBox() {
    const e = document.getElementById(id) as HTMLInputElement;
    e.checked = !e.checked;
  }
  return (
    <div className={`checkboxField ${error && "hasError"}`}>
      <input type="checkbox" name={name} {...inputProps} ref={inputRef} id={id} />
      <label htmlFor={name} onClick={toggleBox}>
        {labelText}
      </label>
      <div className="error">{error}</div>
    </div>
  );
};
export default Component;
