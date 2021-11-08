const { ObjectId } = require("bson")
const mongoose = require("mongoose")

const planSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    foods: {
        type: Object,
        required: true,
    },
    owner: {
        type: ObjectId,
    }
})

mongoose.model("plan", planSchema)
