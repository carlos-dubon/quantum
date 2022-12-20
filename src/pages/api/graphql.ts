import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { NextApiRequest, NextApiResponse } from "next/types";
import Cors from "micro-cors";
import { RequestHandler } from "micro/types/src/lib";
import { context } from "../../graphql/context";
import { schema } from "../../graphql/schema";

export const config = {
  // We don't want body parser to process the requests
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  context,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  introspection: true,
});

const startServer = apolloServer.start();

export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
} as RequestHandler);
