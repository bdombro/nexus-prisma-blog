/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users {
  __typename: "User";
  id: string;
  name: string | null;
  createdAt: any;
  updatedAt: any;
  roles: (string | null)[] | null;
}

export interface Users {
  users: Users_users[];
}
