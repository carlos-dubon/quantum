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

Import your project from GitHub and add these 2 environment variables:

```bash
# Use your Prisma Data Proxy connection string for the DATABASE_URL
DATABASE_URL=''
# This ensures the Prisma Client for the Data Proxy is generated during the build step.
PRISMA_GENERATE_DATAPROXY=true
```
