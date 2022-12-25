<h1 align="center">Quantum ⚛️</h1>

<p align="center" style="font-size: 1.2rem">
 A tech stack to build and scale full-stack applications on serverless environments.
</p>

<hr />

<img
  src="https://img.shields.io/github/stars/carlos-dubon/quantum?style=flat-square"
  alt="Stars"
/>
<img
  src="https://img.shields.io/github/forks/carlos-dubon/quantum?style=flat-square"
  alt="Forks"
/>
<img
  src="https://img.shields.io/github/issues-pr/carlos-dubon/quantum?style=flat-square"
  alt="Pulls"
/>

## The Quantum stack

The _"Quantum stack"_ is a serverless web development stack made by [Carlos](https://github.com/carlos-dubon) focused on **simplicity**, **modularity**, and **full-stack typesafety**. It consists of:

- [Next.js](https://nextjs.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [GraphQL Nexus](https://nexusjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)

## Getting started

1. Provision a new database. We recommend using [Railway](https://railway.app/) for this, as you get a free PostgreSQL database under their [free tier](https://railway.app/pricing).

   If you plan on changing the database provider to something like MySQL remember to change it as well in the `schema.prisma` file:

   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. Create a new project at [Prisma Data Platform](https://cloud.prisma.io/projects/create) to get a free [Prisma Data Proxy](https://www.prisma.io/data-platform/proxy).
3. Create a `.env` file in the root of the project and provision the Prisma data proxy connection string to `DATABASE_URL`:

   ```bash
   DATABASE_URL=''
   ```

4. Create a `.env.migrations` file in the root of the project and provision the real database connection string to `DATABASE_URL`:

   ```bash
   DATABASE_URL=''
   ```

5. Use `yarn prisma:migrate` to run migrations. The Prisma Data Proxy cannot run migrations on your database yet, so you must use your database connection string to do that.

6. Use `yarn prisma:generate` to generate a Prisma Client compatible with the Prisma Data Proxy.

7. Use `yarn prisma:studio` to launch a Prisma Data Studio in your browser.

## graphql-codegen

The graphql-codegen [client-preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client) provides typed GraphQL operations (Query, Mutation and Subscription).

```TypeScript
import { graphql } from "../graphql/types/client";

const GetBooksDocument = graphql(`
  query GetBooks { # Give your operation a name
    books {
      id
      name
    }
  }
`);

```

## Deploying to Vercel

Import your project from GitHub and add these 2 environment variables:

```bash
# Use your Prisma Data Proxy connection string for the DATABASE_URL
DATABASE_URL=''
# This ensures the Prisma Client for the Data Proxy is generated during the build step.
PRISMA_GENERATE_DATAPROXY=true
```
