const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()

// This module will verify if a user is logged in to view private information

module.exports = (request, response, next) => {
    const {auth_request} = request.headers

    if (!auth_request)   {
        return response.status(401).json({ error: "Must be logged in to view information"})
    }

    // auth_request will come in the form of "Bearer token"
    // We want to remove the Bearer so we can verify the token
    const token = auth_request.replace("Bearer ", "")
    jwt.verify(token, process.env.SECRET,
        (error, payload) => {
            if (error) {
                response.status(401).json({error: "Must be logged in to view information"})
            }

        const id = payload
        user.findById(id)
        .then(user_data => {
            request.user = user_data
        })
    })   
}