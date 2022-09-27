const { projects, clients } = require("../sampleData.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

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

//Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        // finding the client where the id matches the client id of the project (parent). As client is a child of a project
        return clients.find((client) => client.id === parent.clientId);
      },
    },
  }),
});

// Make a query by the id
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType), // list type as its a list of clients
      resolve(parent, args) {
        return projects;
      },
    },
    project: {
      // query to fetch a client
      type: ProjectType,
      args: { id: { type: GraphQLID } }, //  id arg, to know which client to get
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      }, // The resolver is What to return/respond with
    },
    clients: {
      type: new GraphQLList(ClientType), // list type as its a list of clients
      resolve(parent, args) {
        return clients;
      },
    },
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
