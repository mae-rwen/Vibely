const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true, select: false },
    description: {type: String },
    name: { type: String }, // required: true
    location: { type: String },
    profilePic: { type: String },
    active: { type: Boolean, default: true},
})

const User = model("User", userSchema);

module.exports = {
    User,
}