import React from "react";
import useMetaTags from "react-metatags-hook";
import { Link, useParams } from "react-router-dom";

import NotFound from "../../../../../../../NotFound";
import ParentMeta from "../../meta";
import routeMeta from "./meta";

const Component: React.FC = () => {
  const { id } = useParams();
  useMetaTags({ title: `${routeMeta.title} #${id} - Boilerplate` }, []);
  if (id === "2") return <NotFound />;
  return (
    <>
      <h1>Dynamic Route #${id}</h1>
      <div>
        Welcome to a Dynamic Route! <Link to={ParentMeta.path}>Go back</Link>
      </div>
    </>
  );
};

export default Component;
