const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  users: [String],
  title: String,
  isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model("projects", projectSchema);
