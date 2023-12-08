const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const product = new Schema({
  // _id: { type: ObjectId },
  id: { type: String },
  id_cate: { type: String },
  name: { type: String, required: true },
  price: { type: String },
  img: { type: Array },
  about: { type: String },
  description: { type: Array },
  seasons: { type: String },
  sold: { type: Boolean },
  date: { type: String }
});
module.exports = mongoose.models.products || mongoose.model("product", product);
