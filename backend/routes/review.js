const express = require("express")
const mongoose = require("mongoose")
const hall = mongoose.model("hall")
const jwt = require("jsonwebtoken")
const router = express.Router()
const secret = process.env.SECRET

router.post("/comment", (request, response) => {
    const hall_name = request.body.hall_name
    const comment = request.body.comment
    
    if (!hall_name || !comment || (comment == "")) {
        response.status(422).json({ error: "Please add all fields" })
    }

    hall.findOne({name: hall_name})
    .then((saved_hall) => {
        var temp = saved_hall.comments
        temp.push(comment)
        saved_hall.comments = temp
        saved_hall.save()
        response.json({ message: "Comment Successfully added!" })
        // const temp = saved_hall.comments
        // console.log(2)
    })
    .catch(error => {
        console.log(error)
        console.log("error happens here")
    })

})

module.exports = router