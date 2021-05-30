import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Header from '../../components/Header/Header';
import { signOut, useSession } from 'next-auth/client';

const DETAILS = gql`
  query GetSearch($result: String!) {
    search(type: REPOSITORY, query: $result, first: 10) {
      repositoryCount
      nodes {
        ... on Repository {
          name
          id
          description
          owner {
            login
          }
          languages(first: 1) {
            nodes {
              name
              color
            }
          }
          createdAt
        }
      }
    }
  }
`;

const Search = () => {
  const router = useRouter();
  const { result } = router.query;
  const [session] = useSession();
  const { data } = useQuery(DETAILS, {
    variables: { result: result }
    // pollInterval: 500,
  });
  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  if (!session) return null;

  return (
    <div>
      <Header
        signOut={signOut}
        userName={session && session.user.username}
        picture={session && session.user.picture}
      />

      <ul className="list">
        {data &&
          data.search.nodes.map(repo => (
            <li key={repo.id} className="list__item">
              {console.log(repo)}
              <Link
                href={{
                  pathname: '/details',
                  query: { name: repo.name, author: repo.owner.login }
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
                  style={{
                    backgroundColor:
                      repo.languages.nodes.length > 0
                        ? repo.languages.nodes[0].color
                        : null
                  }}
                  className="language__color"
                ></span>
                <p className="language__name">
                  {repo.languages.nodes.length > 0 &&
                    repo.languages.nodes[0].name}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
