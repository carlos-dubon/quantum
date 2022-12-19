import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/schema.ts",
  documents: ["./src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/types/server.ts": {
      plugins: [
        "@graphql-codegen/typescript",
        "@graphql-codegen/typescript-resolvers",
      ],
      config: {
        scalars: {
          EmailAddress: "string",
        },
      },
    },
    "src/graphql/types/client/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
