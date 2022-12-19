import { prisma } from "../prisma/client";
import { Resolvers } from "./types/server";

const resolvers: Resolvers = {
  Query: {
    books: (_parent, _args, _context) => {
      return prisma.book.findMany();
    },
  },
  Mutation: {
    addBook: async (_parent, args, _context) => {
      const { name } = args;

      return prisma.book.create({
        data: {
          name,
        },
      });
    },
  },
};

export { resolvers };
