import React from "react";

const Component: React.FC = () => {
  const [error, setError] = React.useState();
  if (error) throw error;

  const throwError = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      throw new Error("AhhH!");
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <>
      <div>
        <a href="error" onClick={throwError}>
          Click Here
        </a>{" "}
        to throw an async error.
      </div>
    </>
  );
};

export default Component;
