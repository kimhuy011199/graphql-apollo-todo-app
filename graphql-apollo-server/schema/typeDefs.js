const { gql } = require('apollo-server');

const typeDefs = gql`
  type Todo {
    _id: ID!
    title: String!
    isDone: Boolean!
  }
  input TodoInput {
    title: String!
  }
  type Query {
    getTodo: [Todo!]!
  }
  type Mutation {
    createTodo(todoInput: TodoInput): Todo
    toggleTodo(id: ID!): Todo
    updateTodo(id: ID!, todoInput: TodoInput): Todo
    deleteTodo(id: ID!): Todo
  }
`;

module.exports = { typeDefs };
