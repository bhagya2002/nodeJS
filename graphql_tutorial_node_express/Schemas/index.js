const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const userData = require("../MOCK_DATA.json");
const UserType = require("./TypeDefs/UserType");

// query to get the data we want
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData; // returns all the data for each user
      },
    },
  },
});

// mutation to modify data present in the table
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add a new user "function"
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
  },
});

// GraphQL Schema, schema is a mutation and query
module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
