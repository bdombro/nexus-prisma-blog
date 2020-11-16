import React from "react";
import { useInterval } from "react-use";

const LoadingLayout: DefaultComponent = (props) => {
  const { variant, percentLoaded, style } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: variant === "outer" ? "100vh" : "50vh",
        ...style,
      }}
    >
      <div>
        <img alt="loading" style={{ margin: "auto", paddingLeft: 1 }} src="/tail-spin.svg" />
        <div style={{ margin: "auto" }}>
          {percentLoaded ? (
            <>
              {percentLoaded && <Dot blinking={percentLoaded < 33} />}
              {percentLoaded >= 33 && <Dot blinking={percentLoaded < 66} />}
              {percentLoaded >= 66 && <Dot blinking={percentLoaded < 100} />}
            </>
          ) : (
            " "
          )}
        </div>
      </div>
    </div>
  );
};
export default LoadingLayout;

const Dot = ({ blinking }: { blinking?: boolean }) => {
  const [opacity, setOpacity] = React.useState(1);
  useInterval(
    () => {
      setOpacity(opacity ? 0 : 1);
    },
    blinking ? 500 : null
  );
  return <span style={{ margin: 4, color: "#aaa", opacity }}>.</span>;
};

export type DefaultProps = { variant: "outer" | "inner"; percentLoaded?: number; style?: React.CSSProperties };
export type DefaultComponent = React.FC<DefaultProps>;
