import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';

// This will connect our client instance with the gql api, uri is where server runs.
const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/graphql' : '/graphql'
});

// Make sure all requests that gets sent to
// the server is aware of the token.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
