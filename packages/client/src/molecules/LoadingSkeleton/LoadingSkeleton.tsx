/**
 * Adapted from https://github.com/charitha95/react-skeleton-preload
 */
import "./style.css";

import React from "react";

import { DefaultComponent } from "./types";

const Component: DefaultComponent = (props) => {
  const { colors, width, height, center, circle, count, marginBottom, classes } = props;
  const background = colors ? colors.background || "#f0f0f0" : "#f0f0f0";
  const pulse = colors ? colors.pulse || "#f8f8f8" : "#f8f8f8";
  const styleObj = {
    display: "inherit",
    height: `${height ? `${height}px` : "100%"}`,
    width: `${width ? `${width}px` : "100%"}`,
    background: `linear-gradient(-90deg, ${background} 0%, ${pulse} 50%, ${background} 100%) `,
    backgroundSize: "400% 400%",
    borderRadius: `${circle ? "100%" : "5px"}`,
    margin: `${center ? "auto" : 0}`,
  };
  const Row = ({ key = 0 }) => (
    <span key={key} className={`.loadSkeleton ${classes}`} style={{ ...styleObj, marginBottom: marginBottom ?? 0 }} />
  );
  if (count && count > 0) {
    return (
      <>
        {[...Array(count).keys()].map((_, key) => (
          <Row key={key} />
        ))}
      </>
    );
  }
  return <Row />;
};

export default Component;
