import { NextRequest } from 'next/server';
import { typeDefs } from '@/graphql/schema/typeDefs';
import { resolvers } from '@/graphql/resolvers';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

// Initialize ApolloServer
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create the handler function
const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);

// Correctly export GET and POST as functions with (request, context) signature
export async function GET(request: NextRequest, context: any) {
  return handler(request, context);
}

export async function POST(request: NextRequest, context: any) {
  return handler(request, context);
}