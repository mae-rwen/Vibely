const { Schema, Types, model } = require("mongoose");

const categoriesSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  picture: { type: String },
  eventTotal: { type: Number, default: 0 },
});

const Category = model("Category", categoriesSchema);

module.exports = {
  Category,
};
