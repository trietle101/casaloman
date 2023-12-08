const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const category = new Schema({
  id: { type: String },
  name: { type: String, required: true }
});
module.exports =
  mongoose.models.categories || mongoose.model("category", category);
