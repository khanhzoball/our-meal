const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const user = mongoose.model("user");

router.post("/addfood", (request, response) => {
    const username = request.body.username;
    const hall_name = request.body.menuItem.name;
    const nutrional_info = request.body.menuItem.itemSizes[0].nutritionalInfo;

    if (!username) {
        return response.status(422).json({ error: "Please log in to add to plan." });
    };

    user.findOne({ username: username })
    .then( (user) => {
        if (user) {
            let temp = user.foods;
            temp.push(
                {
                    name: hall_name,
                    nutritionalInfo: nutrional_info,
                    //Added this line here ^ to add nutrional info
                });
            user.foods = temp;
            user.save();
            response.json({ message: "Food Successfully added!" });
            
        } else {
            response.status(404).json({ error: "User not found." });
        };
    })
    .catch( (error) => {
        console.log(error);
    });
});

router.post("/clearall", (request, response) => {
    const username = request.body.username;

    if (!username) {
        return response.status(422).json({ error: "Please log in before clearing your plan" });
    };

    user.findOne({ username: username })
    .then( (user) => {
        if (user) {
            user.foods = [];
            user.save();
            response.json({ message: "Plan successfully cleared" });

        } else {
            response.status(404).json({ error: "User not found." });
        };
    })
    .catch( (error) => {
        console.log(error);
    });
});

//added for Remove Button
router.post("/removefood", (request, response) => {
    const username = request.body.username;
    const food_name = request.body.menuItem.name;

    if (!username) {
        return response.status(422).json({ error: "Please log in to add to plan" });
    };

    user.findOne({ username: username })
    .then( (user) => {
        if (user) {
            let temp = user.foods;
            let index = 0;

            for (let i = 0; i < temp.length; i++) {
                if (temp[i].name == food_name) {
                    index = i;
                    break;
                }
            }
            temp.splice(index, 1);
            user.foods = temp;

            user.save();
            response.json({ message: "Food Successfully removed!" });
            
        } else {
            response.status(404).json({ error: "User not found." });
        };
    })
    .catch( (error) => {
        console.log(error);
    });
});

module.exports = router;