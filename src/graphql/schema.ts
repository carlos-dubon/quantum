import { gql } from "apollo-server-core";

export default gql`
  type Book {
    id: String
    name: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(name: String!): Book!
  }
`;
