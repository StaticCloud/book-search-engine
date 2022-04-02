// import gql
import { gql } from 'apollo-server-express';

// define every type of the data the user is expected to work with via query or mutation
const typeDefs = gql`
    type Auth {
        token: ID!
        usr: User
    }

    type Book {
        bookId: ID!
        authors: [String!]
        description: String
        title: String
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    type Mutation {
        login: Auth
        addUser: Auth
        saveBook(authors: [String!], desc: String!, title: String!, bookId: ID!, link: String!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;