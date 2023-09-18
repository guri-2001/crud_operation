import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})


mongoose.models = {}
module.exports = mongoose.model("Note",noteSchema);