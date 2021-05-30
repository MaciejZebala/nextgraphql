import '../styles/globals.css';
import '../styles/index.scss';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apollo/apolloClient';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
