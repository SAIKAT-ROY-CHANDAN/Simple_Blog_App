export const typeDefs = `#graphql
  type Query{
      me: User
      users: [User]
      posts: [Post]
  }

  type Mutation {
      signup(
           name: String!
           email: String!
           password: String!
      ): UserArgs
  }

  type UserArgs {
      token: String
  }

  type Post {
     id: ID!
     title: String!
     content: String!
     author: User
     createdAt: String!
     published: Boolean!
  }

  type User {
     id: ID!
     name: String!
     email: String!
     createdAt: String!
     posts: [Post]!
  }

  type Profile {
      id: ID!
      bio: String!
      user: User!
      createdAt: String!
  }
`;
