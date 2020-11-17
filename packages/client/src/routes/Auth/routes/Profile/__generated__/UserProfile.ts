/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserProfile
// ====================================================

export interface UserProfile_user {
  __typename: "User";
  id: string;
  name: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface UserProfile {
  user: UserProfile_user | null;
}

export interface UserProfileVariables {
  id: string;
}
