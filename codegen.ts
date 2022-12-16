import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/schema.gql",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/types/": {
      preset: "client",
      plugins: [
        "@graphql-codegen/typescript",
        "@graphql-codegen/typescript-resolvers",
      ],
    },
  },
};

export default config;
