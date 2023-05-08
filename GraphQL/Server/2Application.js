const {ApolloServer}=require("apollo-server")
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");


//typeDefs  how our data is structured(schema)
//resolvers functions,make calls to apis



const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});