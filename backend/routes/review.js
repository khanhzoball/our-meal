const express = require("express")
const mongoose = require("mongoose")
const hall = mongoose.model("hall")
const jwt = require("jsonwebtoken")
const router = express.Router()
const secret = process.env.SECRET
const login_verif = require("../middlewares/login_verif.js")

router.post("/reviews", (request, response) => {
    const hall_name = request.body.hall_name

    if (!hall_name) {
        response.status(422).json({ error: "Please add all fields" })
    }

    hall.findOne({name: hall_name})
    .then((saved_hall) => {
        if (saved_hall) {
            console.log(saved_hall.comments)
            response.json({ reviews: saved_hall.comments })
        } else {
            response.status(404).json({ error: "Dining Hall does not exist" });
        }       
    })
    .catch(error => {
        console.log(error)
    })
})

router.post("/comment", (request, response) => {
    const hall_name = request.body.hall_name
    const comment = request.body.comment
    
    if (!hall_name || !comment || (comment == "")) {
        response.status(422).json({ error: "Please add all fields" })
    }

    hall.findOne({name: hall_name})
    .then((saved_hall) => {
        if (saved_hall) {
            var temp = saved_hall.comments
            temp.push(comment)
            saved_hall.comments = temp
            saved_hall.save()
            response.json({ message: "Comment Successfully added!" })
        } else {
            response.status(404).json({ error: "Dining Hall does not exist" });
        }
    })
    .catch(error => {
        console.log(error)
    })

})
router.post("/like", (request, response) => {
    const hall_name = request.body.hall_name

    if (!hall_name) {
        response.status(422).json({ error: "Please add all fields" })
    }

    hall.findOne({name: hall_name})
    .then((saved_hall) => {
        if (saved_hall) {
            var temp = saved_hall.likes
            temp += 1
            saved_hall.likes = temp
            saved_hall.save()
            response.json({
                likes: temp,
                message: "Liked!",
            })
        } else {
            response.status(404).json({ error: "Dining Hall does not exist" });
        }
    })
    .catch(error => {
        console.log(error)
    })
})

router.post("/retrievelikes", (request, response) => {
    const hall_name = request.body.hall_name

    if (!hall_name) {
        response.status(422).json({ error: "Please add all fields" })
    }

    hall.findOne({name: hall_name})
    .then((saved_hall) => {
        if (saved_hall) {
            var temp = saved_hall.likes
            response.json({
                likes: temp,
                
            })
        } else {
            response.status(404).json({ error: "Dining Hall does not exist" });
        }
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router