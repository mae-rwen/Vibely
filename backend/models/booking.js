const { Schema, Types, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    event: { type: Types.ObjectId, ref: "Event"},
    user: {type: Types.ObjectId, ref: "User"},
  },
  {
    timestamps: true
  }  
);

const Booking = model("Booking", bookingSchema);

module.exports = {
    Booking,
};
