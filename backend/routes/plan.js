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

//added for Remove Button
router.post("/removefood", (request, response) => {
    
    if (!request.body.username) {
        return response.status(422).json({ error: "Please log in to add to plan" });
    }

    user.findOne({username: request.body.username})
    .then((user) => {
        if (user) {
            //console.log(user.foods.length)
            var temp = user.foods

            //this probably does not work correctly
            let index = temp.indexOf({
                name: request.body.user.name
            })

            temp.splice(index, 1);
            user.foods = temp

            //console.log(user.foods.length)

            user.save()
            response.json({ message: "Food Successfully removed!" })
            
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