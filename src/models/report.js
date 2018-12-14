const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  user: String,
  mounth: String,
  year: String,
  tasks: Array,
  features: Number,
  bugs: Number
});

module.exports = mongoose.model("reports", reportSchema);
