import { NextRequest } from 'next/server';
import { typeDefs } from '@/graphql/schema/typeDefs';
import { resolvers } from '@/graphql/resolvers';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);

export { handler as GET, handler as POST };
