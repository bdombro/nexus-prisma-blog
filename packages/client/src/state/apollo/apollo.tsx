import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  const cookie = localStorage.getItem("authentication");
  const token = cookie && JSON.parse(cookie).accessToken;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Provider: React.FC = (props) => {
  const { children } = props;
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default {
  client,
  Provider,
};
