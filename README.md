<h1 align="center">Quantum ⚛️</h1>

<p align="center" style="font-size: 1.2rem">
 A tech stack to build and scale full-stack applications on the edge.
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

## What is the edge?

The edge is a form of serverless compute that allows running server-side code geographically closer to your users. Traditionally, applications that required such computation would be deployed to a single region such as [us-east-1](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones). The edge works similarly to [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions) but without the cold starts because they have a smaller runtime that leads to fast startup times.

Examples of such environments include [Vercel Edge Runtime](https://edge-runtime.vercel.app/) and [Cloudflare Workers](https://workers.cloudflare.com/). Now this all sounds great but one of the limitations that you may run into while working with on the edge is that you can't access a traditional database and this is because edge environments only support HTTP based connections and traditional databases require long-lived TCP connections.

One way that you can get around this limitation is by using the [Prisma Data Proxy](https://www.prisma.io/docs/data-platform/data-proxy) it's a proxy server for your database that allows you to interact with your database over HTTP and manage your connection pool for your database.

## Getting started

1. Provision a new PostgreSQL database. We recommend using [Railway](https://railway.app/) for this, as you get a free database under their [free tier](https://railway.app/pricing).

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

## Deploying to Vercel
