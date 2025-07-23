import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        role: [Role!]!
    }
        
    type Role {
        id: Int!
        name: String!
        permission: String!
    }
    
    type Crane {
        id: Int!
        serial_number: String!
        model: String!
        location: String
        status: String!
    }
    
    type Mutation {
        createCrane(serial_number: String!, model: String!, location: String, status: String!): Crane!
    }

    type Query {
        users: [User!]!
        roles: [Role!]!
        cranes: [Crane!]!
    }
`;