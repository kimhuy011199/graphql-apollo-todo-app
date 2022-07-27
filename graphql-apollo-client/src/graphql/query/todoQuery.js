import { gql } from '@apollo/client';

const GET_TODO = gql`
  query getTodo {
    getTodo {
      _id
      title
      isDone
    }
  }
`;

export { GET_TODO };
