import { gql } from '@apollo/client';

const CREATE_TODO = gql`
  mutation CreateTodo($todoInput: TodoInput) {
    createTodo(todoInput: $todoInput) {
      _id
      title
      isDone
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($updateTodoId: ID!, $todoInput: TodoInput) {
    updateTodo(id: $updateTodoId, todoInput: $todoInput) {
      _id
      title
      isDone
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($toggleTodoId: ID!) {
    toggleTodo(id: $toggleTodoId) {
      _id
      title
      isDone
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($deleteTodoId: ID!) {
    deleteTodo(id: $deleteTodoId) {
      _id
      title
      isDone
    }
  }
`;

export { CREATE_TODO, TOGGLE_TODO, DELETE_TODO, UPDATE_TODO };
