import { makeSchema, objectType, extendType, nonNull, stringArg } from "nexus";
import { join } from "path";

const Book = objectType({
  name: "Book",
  definition(t) {
    t.id("id"), t.string("name");
  },
});

const Books = extendType({
  type: "Query",
  definition(t) {
    t.list.field("books", {
      type: Book,
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.book.findMany();
      },
    });
  },
});

const CreateBook = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createBook", {
      type: Book,
      args: {
        name: nonNull(stringArg()),
      },
      resolve: (_parent, args, ctx) => {
        const { name } = args;

        return ctx.prisma.book.create({
          data: {
            name,
          },
        });
      },
    });
  },
});

const schema = makeSchema({
  types: [Book, Books, CreateBook],
  contextType: {
    module: join(process.cwd(), "src/graphql/context.ts"),
    export: "Context",
  },
  outputs: {
    schema: join(process.cwd(), "src/graphql/generated/schema.graphql"),
    typegen: join(process.cwd(), "src/graphql/generated/nexus-typegen.d.ts"),
  },
});

export { schema };
