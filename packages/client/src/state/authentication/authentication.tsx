import { gql, useApolloClient } from "@apollo/client";
import React from "react";
import { useLocalStorage } from "react-use";

import { ContextType } from "./types";

export const defaultValue: ContextType["state"] = Object.freeze({
  accessToken: "",
  userId: "",
  roles: [],
});

export const AuthenticationContext = React.createContext<ContextType>({
  state: defaultValue,
  login: async () => ({ errors: [{ message: "Not initialized" }] as any }),
  logout: async () => {},
  register: async () => ({ errors: [{ message: "Not initialized" }] as any }),
});

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [state = defaultValue, setState] = useLocalStorage<ContextType["state"]>("authentication", defaultValue);
  const apolloClient = useApolloClient();

  const login: ContextType["login"] = React.useCallback(
    async (creds) => {
      const res = await apolloClient.query({ query: TOKEN, variables: creds });
      if (!res.errors) {
        setState(res.data.token);
      }
      return res;
    },
    [apolloClient, setState]
  );

  const logout: ContextType["logout"] = React.useCallback(async () => {
    setState(defaultValue);
  }, [setState]);

  const register: ContextType["register"] = React.useCallback(
    async (creds) => {
      const regRes = await apolloClient.query({ query: CREATE_USER, variables: creds });
      if (regRes.error) {
        return regRes;
      }
      return login({ email: creds.email, password: creds.password! });
    },
    [apolloClient, login]
  );

  // const refresh = React.useCallback(async () => {
  //   if (state.refreshToken) {
  //     const res = await mockApi(EndpointsEnum.refresh, { refreshToken: state.refreshToken });
  //     if (!res.error) {
  //       setState(res.data);
  //     }
  //   }
  // }, [setState, state.refreshToken]);
  //
  // useInterval(refresh, 10 * 1000);

  const values: ContextType = { state, login, logout, register };

  return <AuthenticationContext.Provider value={values}>{children}</AuthenticationContext.Provider>;
};

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}

const TOKEN = gql`
  query Token($email: String!, $password: String!) {
    token(email: $email, password: $password) {
      accessToken
      userId
      roles
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createOneUser(input: $input) {
      id
    }
  }
`;
