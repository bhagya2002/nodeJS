// "import" express from 'express';
const express = require("express");

// make apps, instance of express
const app = express();
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// to get graphiql
const { graphqlHTTP } = require("express-graphql");
const PORT = 3001;

// make "database"
const seedData = [
  { id: 1, language: "Python", loved: true },
  { id: 2, language: "Javascript", loved: true },
  { id: 3, language: "Scala", loved: true },
];

// Schema - model of the data, what does it look like? this can be fetched

// Resolver - explains how to fetch the data from the database
const languageType = new GraphQLObjectType({
  name: "Language",
  description: "Programming language",
  //   language type has 3 fields that are exposed to the user
  fields: {
    id: { type: GraphQLInt },
    language: { type: GraphQLString },
    loved: { type: GraphQLBoolean },
  },
});

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is the root query",
  //   root query has one query which is languageType
  fields: {
    languages: {
      type: new GraphQLList(languageType),
      resolve: () => seedData,
    },

    // finding a language by id by passing in the args
    language: {
      type: languageType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, { id }) => seedData.find((language) => language.id === id),
    },
  },
});

// mutation - allows us to change the data
const rootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "This is the root mutation",
  fields: {
    language: {
      type: languageType,
      args: {
        language: { type: GraphQLString },
        loved: { type: GraphQLBoolean },
      },
      resolve: (_, { lang, loved }) => {
        const newLanguage = {
          id: seedData.length + 1,
          language: lang,
          loved: loved,
        };
        seedData.concat(newLanguage);
        return newLanguage;
      },
    },
  },
});

// defines the schema
const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // enable the interface for graphQL (like postman)
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
