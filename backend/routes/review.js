const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const hall = mongoose.model("hall");
const user = mongoose.model("user");


router.post("/reviews", (request, response) => {
    const hall_name = request.body.hall_name;

    if (!hall_name) {
        response.status(422).json({ error: "Please add all fields" });
    };

    hall.findOne({ name: hall_name })
    .then( (saved_hall) => {
        if (saved_hall) {
            response.json({ reviews: saved_hall.comments });
        } else {
            response.status(404).json({ error: "Dining Hall does not exist" });
        };
    })
    .catch( (error) => {
        console.log(error);
    });
});

router.post("/comment", (request, response) => {
    const hall_name = request.body.hall_name;
    const comment = request.body.comment;
    
    if (!hall_name || !comment || (comment == "")) {
        response.status(422).json({ error: "Please add all fields" });
    };

    hall.findOne({ name: hall_name })
    .then( (saved_hall) => {
        if (saved_hall) {
            let temp = saved_hall.comments;
            temp.push(comment);
            saved_hall.comments = temp;
            saved_hall.save();

            response.json({ message: "Comment Successfully added!" });
        } else {
            response.status(404).json({ error: "Dining Hall does not exist" });
        };
    })
    .catch( (error) => {
        console.log(error);
    });
});

router.post("/like", (request, response) => {
    const hall_name = request.body.hall_name;
    const username = request.body.username;

    if (!hall_name) {
        response.status(422).json({ error: "Please add all fields" });
    };

    if (!username) {
        response.status(422).json({ error: "You must be logged in to like." });
    };

    hall.findOne({ name: hall_name })
    .then( (saved_hall) => {
        if (saved_hall) {
            user.findOne({ username: username })
            .then((user) => {
                let already_liked = false;
                for (let i = 0; i <  user.likedhalls.length; i++) {
                    if (user.likedhalls[i] == hall_name) {
                        already_liked = true;
                        break;
                    };
                };
                
                if (already_liked == false) {
                    let temp = saved_hall.likes;
                    temp += 1;
                    saved_hall.likes = temp;
                    saved_hall.save();

                    let temp2 = user.likedhalls;
                    temp2.push(hall_name);
                    user.likedhalls = temp2;
                    user.save();

                    response.json({
                        likes: temp,
                        message: "Liked!",
                    });
                } else {
                    response.status(422).json({ error: "You Already Liked this hall!" });
                };
            })
            .catch( (error) => {
                console.log(error);
            });
        } else {
            response.status(404).json({ error: "Dining Hall does not exist" });
        };
    })
    .catch( (error) => {
        console.log(error);
    });
});

router.post("/retrievelikes", (request, response) => {
    const hall_name = request.body.hall_name;

    if (!hall_name) {
        response.status(422).json({ error: "Please add all fields" });
    };

    hall.findOne({ name: hall_name })
    .then((saved_hall) => {
        if (saved_hall) {
            let temp = saved_hall.likes;
            response.json({
                likes: temp,
            });
        } else {
            response.status(404).json({ error: "Dining Hall does not exist" });
        };
    })
    .catch( (error) => {
        console.log(error);
    });
});

module.exports = router;