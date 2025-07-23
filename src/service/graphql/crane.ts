import {gql} from '@apollo/client';
console.log('crane.ts')
export const GET_CRANES = gql`
  query GetCranes {
    cranes {
      id
      serial_number
      model
      location
      status
    }
  }
`;

export const CREATE_CRANE = gql`
  mutation CreateCrane($serial_number: String!, $model: String!, $location: String, $status: String!) {
    createCrane(serial_number: $serial_number, model: $model, location: $location, status: $status) {
      id
      serial_number
      model
      location
      status
    }
  }
`;

