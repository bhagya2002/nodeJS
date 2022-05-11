const express = require("express");
const app = express();
const PORT = 6969;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");

// endpoint for graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // enable graphiql in production, see a visual
  })
);

app.listen(PORT, () => {
  console.log("Server running");
});
