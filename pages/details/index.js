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
                  email
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
  const { loading, data } = useQuery(DETAILS, {
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
    <div>
      <Header
        signOut={signOut}
        userName={session && session.user.username}
        picture={session && session.user.picture}
      />
      {!loading && console.log(data)}
      {author}
      {name}
    </div>
  );
};

export default Details;
