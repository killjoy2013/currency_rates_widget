import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    description: String
  }

  type Query {
    hello: String

    getAllPosts: [Post]
    getPost(name: String!): Post
  }

  input CreatePostInput {
    title: String!
    description: String
  }

  input UpdatePostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post
    deletePost(id: ID!): String
    updatePost(id: ID!, input: UpdatePostInput!): Post
  }
`;

export default typeDefs;
