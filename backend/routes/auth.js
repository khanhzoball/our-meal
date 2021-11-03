const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const router = express.Router()
const User = mongoose.model("User")
const secret = process.env.SECRET

router.get("/", (request, response) => {
    response.send("wassup")
})

// User signup
router.post("/signup", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    if (!username || !password) {
        response.status(422).json({ error: "Please add all fields" })
    }

    User.findOne({ username: username })
    .then ((savedUser) => {
        if (savedUser) {
            return response.status(422).json({ error: "There already exists an account with that username"})
        }
    })

    const user = new User({ username, password })
    user.save()
    .then(user => {
        response.json({ message: "Account Saved Sucessfully"})
    })
    .catch(error => {
        console.log(error)
    })
})

// User log in
router.post("/login", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    if (!username || !password) {
        response.status(422).json({ error: "Please include both username and password" })
    }

    User.findOne({ username: username })
    .then ((savedUser) => {
        if (!savedUser) {
            return response.status(422).json({ error: "Invalid username or password" })
        }

        if (savedUser.password == password) {
            response.json("Successful")
            const token = jwt.sign({ id: savedUser.id }, secret)

        } else {
            return response.status(422).json({ error: "Invalid username or password" })
        }
    })
})

module.exports = router