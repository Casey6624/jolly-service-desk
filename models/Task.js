const mongoose = require("mongoose")

const { Schema } = mongoose


const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    assignedTo: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Task", taskSchema)