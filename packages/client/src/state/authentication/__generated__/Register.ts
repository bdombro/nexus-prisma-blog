/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterInputType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_createOneUser {
  __typename: "User";
  id: string;
}

export interface Register {
  createOneUser: Register_createOneUser | null;
}

export interface RegisterVariables {
  data: RegisterInputType;
}
