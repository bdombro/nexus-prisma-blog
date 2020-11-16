import { gql, useQuery } from "@apollo/client";
import React from "react";
import useMetaTags from "react-metatags-hook";
import { Link, useParams } from "react-router-dom";

import NotFound from "../../../../../NotFound";
import ParentMeta from "../../meta";
import { User } from "./__generated__/User";
import routeMeta from "./meta";

const Component: React.FC = (props) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<User>(USER, { variables: { id } });
  useMetaTags({ title: `${routeMeta.title} ${data?.user?.name} - Boilerplate` }, []);

  if (loading) return <p>Loading...</p>;
  if (error) throw new Error(JSON.stringify(error, null, 2));

  const user = data?.user;

  if (!user) return <NotFound {...props} />;

  return (
    <>
      <h1>User #{id}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>
        <Link to={ParentMeta.path}>
          <button>Go back</button>
        </Link>
      </div>
    </>
  );
};

export default Component;

const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      createdAt
      updatedAt
      roles
    }
  }
`;
