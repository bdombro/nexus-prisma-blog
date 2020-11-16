import React from "react";

import Inner from "./atoms/WithError";

const Component: React.FC = () => {
  return (
    <>
      <div>This test show how an inner component can have it's own error boundary.</div>
      <div style={{ background: "gray" }}>
        <Inner />
      </div>
    </>
  );
};

export default Component;
