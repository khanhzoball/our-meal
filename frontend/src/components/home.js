import React, { useState, useEffect } from "react";



const Home = () => {
    const [foods, setFoods] = useState([]);
    const [updated, setUpdated] = useState(0);
    var Calories = 0
    var Total_Fat = 0
    var Saturated_Fat = 0
    var Trans_Fat = 0
    var Cholesterol = 0
    var Sodium = 0
    var Total_Carbohydrate = 0
    var Dietary_Fiber = 0
    var Sugars = 0
    var Protein = 0

    const username = localStorage.username;

    
    useEffect(() => {
        fetch("/plan", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify({
                username,
            })
        })
        .then(response => response.json())
        .then(resJson => {
            let message = document.getElementById("message")
            if (resJson.foods) {
                setFoods(resJson.foods)
                message.innerHTML = ""
            } else {
                message.innerHTML = resJson.error + "<br/>";
            }
        })
    },[updated]); 


    for (let i = 0; i < foods.length; i++) {
        if (foods[i].nutritionalInfo[0].value) {Calories += foods[i].nutritionalInfo[0].value}
        if (foods[i].nutritionalInfo[1].value) {Total_Fat += foods[i].nutritionalInfo[1].value}
        if (foods[i].nutritionalInfo[2].value) {Saturated_Fat += foods[i].nutritionalInfo[2].value}
        if (foods[i].nutritionalInfo[3].value) {Trans_Fat += foods[i].nutritionalInfo[3].value}
        if (foods[i].nutritionalInfo[4].value) {Cholesterol += foods[i].nutritionalInfo[4].value}
        if (foods[i].nutritionalInfo[5].value) {Sodium += foods[i].nutritionalInfo[5].value}
        if (foods[i].nutritionalInfo[6].value) {Total_Carbohydrate += foods[i].nutritionalInfo[6].value}
        if (foods[i].nutritionalInfo[7].value) {Dietary_Fiber += foods[i].nutritionalInfo[7].value}
        if (foods[i].nutritionalInfo[8].value) {Sugars += foods[i].nutritionalInfo[8].value}
        if (foods[i].nutritionalInfo[9].value) {Protein += foods[i].nutritionalInfo[9].value}
        console.log(Calories)
    }

    
    console.log(Calories)
    
    const FOOD_MAPPER = (props) => {


        // Added this nutritional mapper
        const NUTRITION_MAPPER = (props) => {
            var name = props.nutritionalInfo.name
            var value = ""
            var units = ""

            if (props.nutritionalInfo.value) {
                value = props.nutritionalInfo.value
            }
            if (props.nutritionalInfo.units) {
                units = props.nutritionalInfo.units
            }

            return (
                <div> {name + ": " + value + units } </div>
            )
        }

        

        //added for Remove Button
        const Remove_from_plan = () => {
                fetch("/removefood", {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                        "Accept":"application/json",
                    },
                    body: JSON.stringify({
                        menuItem: props.foods,
                        username: localStorage.username
                    })
                })
                .then(response => response.json())
                .then(data => {
                    setUpdated(updated + 1)
                    // let message = document.getElementById(props.foods.name)
                    // if (data.error) {
                    //     message.innerHTML = data.error + "<br/>";
                    // }
                    // else {
                    //     message.innerHTML = data.message + "<br/>";
                    // }
                })
        }



        return (
            <div>
                <h3>
                    {props.foods.name}
                    <button onClick={ () => Remove_from_plan() }>Remove</button>
                </h3>
                {            
                    props.foods.nutritionalInfo.map((nutritionalInfo) => {
                        return <NUTRITION_MAPPER nutritionalInfo = {nutritionalInfo}/>
                    })
                }
                <br/>
            </div>
        )
    }

        const Clear_All = () => {
            fetch("/clearall", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body: JSON.stringify({
                    username: localStorage.username
                })
            })
            .then(response => response.json())
            .then(data => {
                setUpdated(updated + 1)
            //     let message = document.getElementById(props.menuItem.name)
            //     if (data.error) {
            //         message.innerHTML = data.error + "<br/>";
            //     }
            //     else {
            //         message.innerHTML = data.message + "<br/>";
            //     }
            })
        }


    

    return (
        <div>
            <h1>Home</h1>
            <h3>Daily Total</h3>
            <div>
                Calories: {Calories}
                <br/>
                Total Fat: {Total_Fat}
                <br/>
                Saturated Fat: {Saturated_Fat}
                <br/>
                Trans Fat: {Trans_Fat}
                <br/>
                Cholesterol: {Cholesterol}
                <br/>
                Sodium: {Sodium}
                <br/>
                Total Carbohydrate: {Total_Carbohydrate}
                <br/>
                Dietary Fiber: {Dietary_Fiber}
                <br/>
                Sugars: {Sugars}
                <br/>
                Protein: {Protein}
            </div>
            <button onClick={ () => Clear_All() }>Clear Plan</button>
            <span id="message"></span>
            <div>
                {            
                    foods.map((foods) => {
                        return <FOOD_MAPPER foods = {foods}/>
                    })
                }
            </div>
        </div>
    )
}


export default Home