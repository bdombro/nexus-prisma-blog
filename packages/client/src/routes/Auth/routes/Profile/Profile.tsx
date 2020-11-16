import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

import { useAuthentication } from "../../../../state/authentication";
import DashboardMeta from "../../../Dashboard/meta";
import LogoutMeta from "../Logout/meta";
import { UserProfile } from "./__generated__/UserProfile";

const Component: React.FC = () => {
  const { state: authState } = useAuthentication();
  const { loading, error, data } = useQuery<UserProfile>(USER, { variables: { id: authState.userId } });

  if (loading) return <p>Loading...</p>;
  if (error) throw new Error(JSON.stringify(error, null, 2));

  const user = data!.user!;

  return (
    <>
      <h1>Welcome to your profile, {user.name}!</h1>
      <ul>
        <li>
          <Link to={DashboardMeta.path}>Goto dashboard</Link>
        </li>
        <li>
          <Link to={LogoutMeta.path}>Logout</Link>
        </li>
      </ul>
    </>
  );
};

export default Component;

const USER = gql`
  query UserProfile($id: ID!) {
    user(id: $id) {
      id
      email
      createdAt
      updatedAt
    }
  }
`;
