import React from "react";

const Inner = () => {
  throw new Error("Ahhh!");
  // eslint-disable-next-line no-unreachable
  return <></>;
};
export default Inner;
