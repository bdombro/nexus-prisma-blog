/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createOneUser {
  __typename: "User";
  id: string;
}

export interface CreateUser {
  createOneUser: CreateUser_createOneUser;
}

export interface CreateUserVariables {
  input: UserCreateInput;
}
