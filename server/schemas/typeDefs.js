// import gql
const { gql } = require('apollo-server-express');

// define all types of data we will use in our application including what data they return
const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
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
        saveBook(authors: [String!], description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;