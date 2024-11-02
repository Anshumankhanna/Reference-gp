import { Schema, model } from "mongoose";

const userSchema = Schema({
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
        type: Schema.Types.ObjectId,
        ref: "complaint"
    }]
});

export default model("user", userSchema);