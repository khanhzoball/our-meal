const mongoose = require("mongoose")

var hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    likes: {
        type: Number,
    },
    comments: {
        type: Array,
    },
});

mongoose.model("hall", hallSchema);
