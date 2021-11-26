const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    foods: {
        type: Array,
        required: true,
    }
})

mongoose.model("user", userSchema)
