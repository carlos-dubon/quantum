import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/generated/schema.graphql",
  documents: ["./src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/generated/client/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
