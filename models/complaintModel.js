const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Unresolved", "Resolved"],
        default: "Unresolved"
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("complaint", complaintSchema);