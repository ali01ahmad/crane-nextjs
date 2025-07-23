import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: '/api/graphql', // this points to your API route
  cache: new InMemoryCache(),
});
