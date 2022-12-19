import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { NextApiRequest, NextApiResponse } from "next/types";

import { resolvers } from "../../graphql/resolvers";

import Schema from "../../graphql/schema";

export const config = {
  // We don't want body parser to process the requests
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs: Schema,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  introspection: true,
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
