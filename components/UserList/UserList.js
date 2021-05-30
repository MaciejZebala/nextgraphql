import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
const PROFILE = gql`
  query {
    viewer {
      repositories(first: 5) {
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
  const { error, loading, data } = useQuery(PROFILE, { errorPolicy: 'all' });

  if (loading) {
    return <div className="loader"></div>;
  }
  if (error) {
    return <div>Brak danych</div>;
  }

  return (
    <ul className="list">
      {data &&
        data.viewer.repositories.nodes.map(repo => (
          <li key={repo.id} className="list__item">
            <Link
              href={{
                pathname: '/details',
                query: { name: repo.name, author: userName }
              }}
              className="link"
            >
              {repo.name}
            </Link>
            <p className="desc">
              {repo.description ? repo.description : 'Brak opisu'}
            </p>
            <div className="language">
              <span
                style={{ backgroundColor: repo.languages.nodes[0].color }}
                className="language__color"
              ></span>
              <p className="language__name">{repo.languages.nodes[0].name}</p>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default UserList;
