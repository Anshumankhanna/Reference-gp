const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: Number,
    profilePicture: String,
});

module.exports = mongoose.model("admin", userSchema);