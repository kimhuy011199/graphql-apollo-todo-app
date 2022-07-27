import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query getTodos {
    todos {
      _id
      title
      isDone
    }
  }
`;

export { GET_TODOS };
