const { Schema, Types, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    event: { type: Types.ObjectId, ref: "Event"},
    category: { type: Types.ObjectId, ref: "Category" },
    user: {type: Types.ObjectId, ref: "User"},
  },
  {
    timestamps: true
  }  
);

const Book = model("Book", bookingSchema);

module.exports = {
    Book,
};
