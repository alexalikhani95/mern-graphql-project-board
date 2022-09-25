const { projects, clients } = require("../sampleData.js");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = require("graphql");

//  Client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Make a query by the id
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      // query to fetch a client
      type: ClientType,
      args: { id: { type: GraphQLID } }, //  id arg, to know which client to get
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      }, // The resolver is What to return/respond with
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
