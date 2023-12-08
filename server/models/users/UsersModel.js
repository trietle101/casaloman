const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
  // _id: { type: ObjectId },
  id: { type: String },
  email: { type: String },
  name: { type: String, required: true },
  password: { type: String },
  date: { type: String },
  role: { type: String }
});
module.exports = mongoose.models.users || mongoose.model("user", user);
