import React from "react";
import { Link } from "react-router-dom";

import { RouteMeta } from "../../../../routes/types";
import { DefaultComponent } from "./types";

const Component: DefaultComponent = (props) => {
  const { routeMeta } = props;
  const metas = flatten(routeMeta).reverse();
  return (
    <div className="breadcrumbs">
      <span>Breadcrumbs: </span>
      <ul>
        {metas.map((m, i) => (
          <li key={m.title}>{i === metas.length - 1 ? m.title : <Link to={m.path}>{m.title}</Link>}</li>
        ))}
      </ul>
    </div>
  );

  function flatten(routeMeta: RouteMeta, metas: RouteMeta[] = []): RouteMeta[] {
    metas.push(routeMeta);
    if (routeMeta.parent) {
      metas = flatten(routeMeta.parent, metas);
    }
    return metas;
  }
};
export default Component;
