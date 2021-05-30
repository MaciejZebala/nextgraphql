import '../styles/globals.css';
import '../styles/index.scss';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apollo/apolloClient';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
