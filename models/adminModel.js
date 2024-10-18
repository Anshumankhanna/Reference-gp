const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    level: {
        type: String,
        enum: ["devadmin", "admin"],
        default: "admin"
    }
});

module.exports = mongoose.model("admin", adminSchema);