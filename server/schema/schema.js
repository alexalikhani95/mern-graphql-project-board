// Mongoose models
const Project = require("../models/Project");
const Client = require("../models/Client");

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
        return clients.findById(parent.clientId);
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
        return Project.find();
      },
    },
    project: {
      // query to fetch a client
      type: ProjectType,
      args: { id: { type: GraphQLID } }, //  id arg, to know which client to get
      resolve(parent, args) {
        return Project.findById(args.id);
      }, // The resolver is What to return/respond with
    },
    clients: {
      type: new GraphQLList(ClientType), // list type as its a list of clients
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      // query to fetch a client
      type: ClientType,
      args: { id: { type: GraphQLID } }, //  id arg, to know which client to get
      resolve(parent, args) {
        return Client.findById(args.id);
      }, // The resolver is What to return/respond with
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
