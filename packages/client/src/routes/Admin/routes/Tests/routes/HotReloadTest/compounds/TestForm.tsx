import React from "react";

export const TestForm: TestForm = () => {
  return (
    <form>
      <input type="text" />
    </form>
  );
};

export type TestFormProps = {};
export type TestForm = React.FC<TestFormProps>;
