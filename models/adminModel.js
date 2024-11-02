import { Schema, model } from "mongoose";

const adminSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    level: {
        type: String,
        enum: ["devadmin", "admin"],
        default: "admin"
    }
});

export default model("admin", adminSchema);