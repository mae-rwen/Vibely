const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true, select: false },
    description: {type: String },
    name: { type: String, unique: true }, // required: true
    location: { type: String },
    profilePic: { type: String },
    active: { type: Boolean, default: true},
    rating: { type: Number, min: 0, max: 5},
    // booked: { type: Object},
    // joined: { type: Types.ObjectId, ref: "Booking"},
},
{
    timestamps: true,
  }
)

const User = model("User", userSchema);

module.exports = {
    User,
}