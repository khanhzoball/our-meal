const express = require("express")
const mongoose = require("mongoose")
const user = mongoose.model("user")
const jwt = require("jsonwebtoken")
const router = express.Router()
const secret = process.env.SECRET
const login_verif = require("../middlewares/login_verif.js")

// Default homepage
router.get("/", (request, response) => {
    response.send("wassup")
})

router.get("/protected", login_verif, (request, response) => {
    response.send("Access Cranted")
})

// user signup for POST
router.post("/signup", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    // If missing a field: error
    if (!username || !password) {
        response.status(422).json({ error: "Please add all fields" })
    }

    // Checks if there already exists an account with that username
    user.findOne({ username: username })
    .then ((saved_user) => {
        if (saved_user) {
            return response.status(422).json({ error: "There already exists an account with that username" })
        }
        // Creates a new user and saves the account
        const new_user = new user({ username, password })

        new_user.save()
        .then(() => {
            response.json({ message: "Account Saved Sucessfully" })
        })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    })

})

// user log in for POST
router.post("/login", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    // Checks if missing a field
    if (!username || !password) {
        response.status(422).json({ error: "Please include both username and password" })
    }

    user.findOne({ username: username })
    .then ((saved_user) => {
        
        // If username doesn't exist: error
        if (!saved_user) {
            return response.status(422).json({ error: "Invalid username or password" })
        }
        // Logs in if username and password matches
        // Generates a token that allows user to access private information
        else if (saved_user.password == password) {
            const token = jwt.sign({ _id: saved_user._id }, secret)

            // For testing purposes
            console.log(JSON.stringify({
                token: token,
                user: {
                    username: username,
                }
            }))

            response.json(({
                token: token,
                user: {
                    username: username,
                }
            }))

        } else {
            return response.status(422).json({ error: "Invalid username or password" })
        }
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router