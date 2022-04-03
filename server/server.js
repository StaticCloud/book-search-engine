const express = require('express');
const path = require('path');

// import apollo server object
const { ApolloServer } = require('apollo-server-express')
const { authMiddleware } = require('./utils/auth')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  // pass typedefs and resolvers as config values
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  })

  // start the server
  await server.start();

  // integrate our apollo server with our express app
  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// // if a get request was made to any location, redirect to the production-ready front-end code
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
