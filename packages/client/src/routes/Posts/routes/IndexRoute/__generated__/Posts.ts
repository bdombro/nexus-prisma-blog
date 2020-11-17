/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_author {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface Posts_posts {
  __typename: "Post";
  id: string;
  title: string;
  author: Posts_posts_author;
}

export interface Posts {
  posts: Posts_posts[];
}
