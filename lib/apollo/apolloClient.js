import { getSession } from 'next-auth/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
async function tokenResolver() {
  const token = await getSession();
  return token && token.user.githubAccessToken;
}

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql'
  });

  const authLink = setContext((_, { headers }) => {
    return tokenResolver().then(token => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      };
    });
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  return client;
}

export default createApolloClient;
