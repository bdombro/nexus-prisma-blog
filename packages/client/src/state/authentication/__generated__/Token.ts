/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Token
// ====================================================

export interface Token_token {
  __typename: "Token";
  accessToken: string | null;
  userId: string | null;
  roles: (string | null)[] | null;
}

export interface Token {
  token: Token_token | null;
}

export interface TokenVariables {
  email: string;
  password: string;
}
