import { gql, useQuery } from "@apollo/client";
import React from "react";

import { Posts } from "./__generated__/Posts";

const Component: React.FC = () => {
  const { loading, error, data } = useQuery<Posts>(POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) throw new Error(JSON.stringify(error, null, 2));

  const posts = data || [];

  return (
    <>
      <h1>Posts List</h1>
      <ul>
        {posts.length ? (
          posts.map((p) => (
            <li key={p.id}>
              "{p.title}" by {p.author.name}
            </li>
          ))
        ) : (
          <li>No posts found.</li>
        )}
      </ul>
    </>
  );
};

export default Component;

const POSTS = gql`
    query Posts {
        posts(first: 10) {
            id
            title
            author {
                id
                email
            }
        }
    }
`;
