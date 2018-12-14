const mongoose = require("mongoose");
const { Schema } = mongoose;

const areaSchema = new Schema({
  users: Array,
  title: String,
  isActive: {type: Boolean, default: true},
});

module.exports = mongoose.model("areas", areaSchema);
