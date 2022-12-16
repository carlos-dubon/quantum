import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { NextApiRequest, NextApiResponse } from "next/types";

import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { resolvers } from "../../graphql/resolvers";

// https://nextjs.org/docs/advanced-features/react-18/switchable-runtime#edge-api-routes
// Enable you to build high performance APIs with Next.js using the Edge Runtime.
export const config = {
  // We don't want body parser to process the requests
  api: {
    bodyParser: false,
  },
};

const typeDefs = loadSchemaSync("src/graphql/schema.gql", {
  loaders: [new GraphQLFileLoader()],
});

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
