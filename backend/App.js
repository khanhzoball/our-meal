const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
require("./models/user.js")

dotenv.config()

const App = express()
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URL


mongoose.connect(URI, { useNewUrlParser: true })
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})
mongoose.connection.on("error", () => {
    console.log("error connecting")
})

require("./models/user");
require("./models/plan");
require("./models/hall");

App.use(express.json());
App.use(require("./routes/auth.js"));
App.use(require("./routes/review.js"));


App.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
