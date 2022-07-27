import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';
import theme from './theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getTodo: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache,
});

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ApolloProvider>
  </StrictMode>
);
