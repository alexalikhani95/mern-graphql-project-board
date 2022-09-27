const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      //Enums are types that contain a limited number of fixed values, as opposed to types like Number or String which can have a wide range of values.
      enum: ["Not Started", "In Progress", "Completed"],
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // pertains to the client model
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
