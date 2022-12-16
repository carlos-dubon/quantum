import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@doe.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: (credentials) => {
        // database lookup
        if (
          credentials?.email == "carlos@gmail.com" &&
          credentials.password == "carlos123"
        ) {
          return {
            id: "1",
            name: "Carlos",
            email: "carlos@gmail.com",
            // additional properties
            userType: "admin",
          };
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // add id property
        token.id = user.id;

        // add userType property
        token.userType = user.userType;
      }

      return token;
    },
    session: ({ token, session }) => {
      let customSession = { ...session, id: "", userType: "" };

      if (token) {
        customSession.id = token.id as string;
        customSession.userType = token.userType as string;
        return customSession;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
});
