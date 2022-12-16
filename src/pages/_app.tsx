import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const jotaiProviderScope = Symbol();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <JotaiProvider scope={jotaiProviderScope}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </JotaiProvider>
    </SessionProvider>
  );
};

export default App;
