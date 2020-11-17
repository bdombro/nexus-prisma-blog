import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

import IdRouteMeta from "../[id]/meta";
import { Users } from "./__generated__/Users";

const IndexRoute: React.FC = () => {
  const { loading, error, data } = useQuery<Users>(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) throw new Error(JSON.stringify(error, null, 2));

  const users = data!.users;

  return (
    <>
      <div>Users</div>
      <ul>
        {users.length ? (
          users.map((u) => (
            <li key={u.id}>
              <Link to={`${IdRouteMeta.path.replace(":id", "")}${u.id}`}>{u.name}</Link>
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </>
  );
};

export default IndexRoute;

const USERS = gql`
    query Users {
        users(first: 9999) {
            id
            name
            createdAt
            updatedAt
            roles
        }
    }
`;
