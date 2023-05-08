//[User!]! means the list should not be null if a list is returned then atleast one entry should be non null
const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }
  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }
  type Query {
    users: [User!]!        
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }
  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }
  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }
  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    UKRAINE
  }
`;

module.exports = { typeDefs };

/*
  type Query {
    users: [User!]!         //This should be the name we use in resolver.js
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }
*/

/*
If we now want to write  aquery for users retrieving only specific fields

Query getAllUsers{
    users{
        id
        name
        age
        nationality
    }    
}
*/
 
/*
//We first assign the value in the query parenthesis()
//Then we pass that variable into the internal query
Query getUser($id:ID!){
    user(id:"ugvgv"){
        id
        name
        age
        nationality
    }    
}
*/

//ENUM allows to use the specific values for that data type
//Like we cant use Konoha has a country in real world for nationality

/*
  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }
The nationality=BRAZIL is setting the default value
*/
