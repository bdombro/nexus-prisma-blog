/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user {
  __typename: "User";
  id: string;
  name: string | null;
  createdAt: any;
  updatedAt: any;
  roles: UserRole[];
}

export interface User {
  user: User_user | null;
}

export interface UserVariables {
  id: string;
}
