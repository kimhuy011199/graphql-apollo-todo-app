const dotenv = require('dotenv').config();
const { ApolloServer } = require("apollo-server");
const connectDB = require('./config/db');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');

connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
