import React, { useState, useEffect } from "react";

const Home = () => {
    const [foods, setFoods] = useState([]);

    const username = localStorage.username;

    // const Post = () => {
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
    },[]); 
    // }

    const FOOD_MAPPER = (props) => {
        return (
            <h3>
                {props.foods}
            </h3>
        )
    }


    return (
        
        <div>
            <h1>Home</h1>
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