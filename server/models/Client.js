const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", ClientSchema);
