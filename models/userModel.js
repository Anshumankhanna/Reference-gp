const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    access: {
        type: String,
        enum: ["parent", "teacher", "student", "admin"],
        required: true
    },
    enrollmentNumber: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "complaint"
    }]
});

module.exports = mongoose.model("user", userSchema);