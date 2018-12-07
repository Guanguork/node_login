const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  user: String,
  mounth: String,
  year: String,
  tasks: Array
});

module.exports = mongoose.model("reports", reportSchema);
