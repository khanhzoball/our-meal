const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const user = mongoose.model("user");


// Default homepage
router.post("/plan", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    if (!username) {
        return response.status(422).json({ error: "Please log in to view plan." });
    };

    user.findOne({username: username})
    .then( (user) => {
        if (user) {
            if (!password || password != user.password)
            {
                return response.status(422).json({ error: "Please log in to view plan." });
            } else {
                response.json({ foods: user.foods });
            };
        } else {
            response.status(404).json({ error: "User not found." });
        };
    })
    .catch( (error) => {
        console.log(error);
    });
});


// user signup for POST
router.post("/signup", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    // If missing a field: error
    if (!username || !password) {
        response.status(422).json({ error: "Please add all fields." });
    };

    // Checks if there already exists an account with that username
    user.findOne({ username: username })
    .then ( (saved_user) => {
        if (saved_user) {
            return response.status(422).json({ error: "There already exists an account with that username." });
        };
        // Creates a new user and saves the account
        const new_user = new user({ username, password });

        new_user.save()
        .then( () => {
            response.json({ message: "Account Saved Sucessfully." });
        })
        .catch( (error) => {
            console.log(error);
        });
    })
    .catch( (error) => {
        console.log(error);
    });
});

// user log in for POST
router.post("/login", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    // Checks if missing a field
    if (!username || !password) {
        response.status(422).json({ error: "Please include both username and password." });
    };

    user.findOne({ username: username })
    .then ( (saved_user) => {
        
        // If username doesn't exist: error
        if (!saved_user) {
            return response.status(422).json({ error: "Invalid username or password." });
        }
        // Logs in if username and password matches
        // Generates a token that allows user to access private information
        else if (saved_user.password == password) {
            response.json({
                username: username,
                password: password,
            });
        } else {
            return response.status(422).json({ error: "Invalid username or password." });
        };
    })
    .catch( (error) => {
        console.log(error)
    });
});

module.exports = router;