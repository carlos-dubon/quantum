import Head from "next/head";
import { Inter } from "@next/font/google";
import { NextPage } from "next/types";
import { useQuery } from "@apollo/client";
import { graphql } from "../graphql/generated/client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const GetBooksDocument = graphql(`
  query GetBooks {
    books {
      id
      name
    }
  }
`);

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GetBooksDocument);

  const { data: session } = useSession();

  const router = useRouter();

  console.log("Session", session);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <p className="text-blue-800 text-2xl font-medium">Quantum</p>

        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong.</p>
          ) : (
            <div>{JSON.stringify(data?.books)}</div>
          )}
        </div>

        {session ? (
          <div>
            <p>Welcome {session.user?.name}</p>
            <button
              onClick={() => {
                signOut();
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                router.push("/api/auth/signin");
              }}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
