// Mongoose models
const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
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
        return Client.findById(parent.clientId);
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

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // Name can't be null
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          // create new client using the mongoose model with args from a graphql query
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save(); // save to the database
      },
    },
    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // Name can't be null
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not started", // default value of project is 'Not Started'
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          // create new client using the mongoose model with args from a graphql query
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save(); // save to the database
      },
    },
    // Delete a Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    // Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate", // name has to be unique to renamed different to the 'ProjectStatus' name used before
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              // setting these values to the args values
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true } // If this project is not present, create a new project
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
