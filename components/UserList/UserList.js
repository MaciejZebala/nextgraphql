import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
const PROFILE = gql`
  query {
    viewer {
      repositories(first: 10) {
        nodes {
          name
          description
          languages(first: 1) {
            nodes {
              name
              color
            }
          }

          id
        }
      }
    }
  }
`;
const UserList = ({ userName }) => {
  const { data } = useQuery(PROFILE);
  return (
    <ul>
      {data &&
        data.viewer.repositories.nodes.map(repo => (
          <li key={repo.id}>
            <Link
              href={{
                pathname: '/details',
                query: { name: repo.name, author: userName }
              }}
            >
              {repo.name}
            </Link>
            <p>{repo.description}</p>
            <div>
              <p>{repo.languages.nodes[0].name}</p>
              <span></span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default UserList;
