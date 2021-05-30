import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Header from '../../components/Header/Header';

import { signOut, useSession } from 'next-auth/client';

const DETAILS = gql`
  query GetRepository($author: String!, $name: String!) {
    repository(owner: $author, name: $name) {
      id
      nameWithOwner
      description
      url
      owner {
        id
        login
      }

      sshUrl
      url
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(first: 5) {
              pageInfo {
                hasNextPage
              }

              nodes {
                messageHeadline
                oid
                message
                author {
                  name
                  date
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Details = () => {
  const router = useRouter();
  const { name, author } = router.query;
  const { data } = useQuery(DETAILS, {
    variables: { author: author, name: name }
  });
  const [session] = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  if (!session) return null;

  return (
    <div className="details__wrapper">
      <Header
        signOut={signOut}
        userName={session && session.user.username}
        picture={session && session.user.picture}
      />
      <div className="about">
        <p>Autor: {data && data.repository.owner.login}</p>
        <div className="about__clone">
          <p>Clone</p>
          <input
            value={data && data.repository.sshUrl}
            className="about__clone__input"
          ></input>
        </div>
      </div>
      <ul className="list">
        {data &&
          data.repository.ref.target.history.nodes.map(repo => (
            <li key={repo.oid} className="list__item list__item--commit">
              <div className="info">
                <p>{repo.messageHeadline}</p>
                <div className="info__author">
                  <p>{repo.author.name}</p>
                  <p className="info__date">
                    commited on{' '}
                    {new Intl.DateTimeFormat('pl-PL', {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit'
                    }).format(new Date(repo.author.date))}
                  </p>
                </div>
              </div>
              <p>{repo.oid}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Details;
