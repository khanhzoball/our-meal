const express = require("express")
const mongoose = require("mongoose")
const user = mongoose.model("user")
const jwt = require("jsonwebtoken")
const router = express.Router()
const secret = process.env.SECRET
const login_verif = require("../middlewares/login_verif.js")


router.post("/addfood", (request, response) => {
    
    if (!request.body.username) {
        return response.status(422).json({ error: "Please log in to add to plan" });
    }

    user.findOne({username: request.body.username})
    .then((user) => {
        if (user) {
            var temp = user.foods
            temp.push(
                {
                    name: request.body.menuItem.name,
                    nutritionalInfo: request.body.menuItem.itemSizes[0].nutritionalInfo
                    //Added this line here ^ to add nutrional info
                })
            user.foods = temp
            user.save()
            response.json({ message: "Food Successfully added!" })
            
        } else {
            response.status(404).json({ error: "Error" });
            console.log("error here")
        }       
    })
    .catch(error => {
        console.log(error)
        console.log("error happens here")
    })
})


module.exports = router