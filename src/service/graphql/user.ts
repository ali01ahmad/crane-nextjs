import {gql} from '@apollo/client';
console.log('user.ts')
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
