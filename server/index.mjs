import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./db/connect.js";

//graphql type definitions
const typeDefs = `#graphql
  type Query {
    hello: String
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    work: String
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
    work: String
  }

  type AuthPayload {
  token: String!
  user: User!
  }

  type Mutation {
  signupUser(input: SignupInput!): AuthPayload
  }
`;

//resolver to give what users want
const resolvers = {
  Query: {
    hello: () => "Hello from Apollo Server v5!",
  },
};

//connecting the mongoDB database
await connectDB();

//creating the Apollo server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//starting the server and listening on port 4000
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
