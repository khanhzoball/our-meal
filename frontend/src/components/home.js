import React, { useState, useEffect } from "react";

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [updated, setUpdated] = useState(0);

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
            // .then(response => response.json())
            // .then(data => {
            //     let message = document.getElementById(props.menuItem.name)
            //     if (data.error) {
            //         message.innerHTML = data.error + "<br/>";
            //     }
            //     else {
            //         message.innerHTML = data.message + "<br/>";
            //     }
            // })
        }


    

    return (
        
        <div>
            <h1>Home</h1>
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