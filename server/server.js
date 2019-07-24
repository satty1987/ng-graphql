// server.js

const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./schema").Schema;
const resolvers = require("./resolvers").Resolvers;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: {
    log: e => console.log(e)
  }
});

var app = express();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  "/graphql",
  graphqlHTTP(request => ({
    schema: schema,
    graphiql: true
  }))
);

// Serve only the static files form the dist directory
app.use(express.static('./dist'));

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/index.html'));
});


//app.listen(4000);
app.listen(process.env.PORT || 3000);

console.log("Running a GraphQL API server at " + 3000 );