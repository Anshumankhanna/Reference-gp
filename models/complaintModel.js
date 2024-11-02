import { Schema, model } from "mongoose";

const complaintSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
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

export default model("complaint", complaintSchema);