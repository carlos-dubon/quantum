import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../prisma/client";

// https://nextjs.org/docs/advanced-features/react-18/switchable-runtime#edge-api-routes
// Enable you to build high performance APIs with Next.js using the Edge Runtime.
export const config = {
  // We don't want body parser to process the requests
  api: {
    bodyParser: false,
  },
};

const typeDefs = gql`
  type Book {
    id: String
    name: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(name: String!): Book!
  }
`;

const resolvers = {
  Query: {
    books: (_parent, _args, _context) => {
      return prisma.book.findMany();
    },
  },
  Mutation: {
    addBook: async (_parent, args, _context) => {
      const { name } = args;

      return prisma.book.create({
        data: {
          name,
        },
      });
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

let apolloHandler: (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<unknown>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!apolloHandler) {
    await apolloServer.start();

    apolloHandler = apolloServer.createHandler({
      path: "/api/graphql",
    });
  }

  return apolloHandler(req, res);
}
