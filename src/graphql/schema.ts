import { makeSchema, objectType, queryType } from "nexus";
import { join } from "path";

const Book = objectType({
  name: "Book",
  definition(t) {
    t.id("id"), t.string("name");
  },
});

const Query = queryType({
  definition(t) {
    t.list.field("books", {
      type: Book,
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.book.findMany();
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Book],
  contextType: {
    module: join(__dirname, "./context.ts"),
    export: "Context",
  },
});

export { schema };
