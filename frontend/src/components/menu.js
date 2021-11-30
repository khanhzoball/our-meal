import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import up from "./assets/up.png"
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + ('0' + (today.getDate())).slice(-2);

const Menu = () => {

    var [halls, setHalls] = useState([]);
    
    // Fetching Hall
    useEffect(() => {
        async function getHallData() {

            // NOTE: TWO URL FOR THE API EXISTS. USE WHAT IS NOT BROKEN.

            const response = await fetch("https://michigan-dining-api.tendiesti.me/v1/diningHalls");
            // const response = await fetch("https://michigan-dining-api.herokuapp.com/v1/diningHalls");
            const data = await response.json();
            setHalls(data.diningHalls);
        }

        getHallData();
    },[]); 

    // Mapping halls
    const HALL_MAPPER = (props) => {
        var [menus, setMenus] = useState([]);

        //fetching meal
        useEffect(() => {
            fetch("https://michigan-dining-api.tendiesti.me/v1/menus?date=" + date + "&diningHall=" + props.hall_name.replaceAll(" ", "%20"))
            // fetch("https://michigan-dining-api.herokuapp.com/v1/menus?date=" + date + "&diningHall=" + props.hall_name.replaceAll(" ", "%20"))
            .then( (response) => response.json())
            .then( (resJson) => {
                if (resJson.menus) {
                    setMenus(resJson.menus)
                }
            })
            .catch( (error) => {
                console.log(error);
            })
        },[]); 

        // Mapping Menu
        const MENU_MAPPER = (props) => {
            var [category, setCategory] = useState([]);

            //fetching category
            useEffect(() => {
                fetch("https://michigan-dining-api.tendiesti.me/v1/menus?date=" + date + "&diningHall=" + props.hall_name.replaceAll(" ", "%20") + "&meal=" + props.meal_name.replaceAll(" ", "%20"))
                // fetch("https://michigan-dining-api.herokuapp.com/v1/menus?date=" + date + "&diningHall=" + props.hall_name.replaceAll(" ", "%20") + "&meal=" + props.meal_name.replaceAll(" ", "%20"))
                .then( (response) => response.json())
                .then( (resJson) => {
                    // console.log(resJson)
                    if (resJson.menus[0].category) {
                        setCategory(resJson.menus[0].category)
                    }
                })
                .catch( (error) => {
                    console.log(error);
                })

            },[]);

            const CATEGORY_MAPPER = (props) => {
                
                const ITEM_MAPPER = (props) => {

                    // console.log(props.menuItem)

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

                    // Modified this to add nutrional info
                    const Add_to_plan = () => {
                        fetch("/addfood", {
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json",
                                "Accept":"application/json",
                            },
                            body: JSON.stringify({
                                menuItem: props.menuItem,
                                username: localStorage.username
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            let message = document.getElementById(props.menuItem.name)
                            if (data.error) {
                                message.innerHTML = data.error + "<br/>";
                            }
                            else {
                                message.innerHTML = data.message + "<br/>";
                            }
                        })
                    }
                    
                    if (props.menuItem.itemSizes[0].nutritionalInfo) {
                        return (
                            <div>
                                <h4>
                                {props.menuItem.name} 
                                <button className="button navopt" id="submit_button" onClick={ () => Add_to_plan() }>Add to Plan</button>
                                </h4>
                                <span id={props.menuItem.name}></span>
                                <div className ="info">
                                    {
                                        props.menuItem.itemSizes[0].nutritionalInfo.map(nutritionalInfo =>
                                            {
                                                return <NUTRITION_MAPPER nutritionalInfo = {nutritionalInfo}/>
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <h4>
                                {props.menuItem.name}
                                <button className="button navopt">Add</button>
                                </h4>
                            </div>
                        )}
                }

                return (
                    <div>
                        <h3>
                            {props.category.name}
                        </h3>
                        <div className="Items">
                        {
                            props.category.menuItem.map(menuItem => 
                            {
                                return <ITEM_MAPPER menuItem = {menuItem}/>
                            })
                        },
                        </div>
                    </div>

                )
            }
            
            return (
                <div className="float-pointer">
                    <h2>
                    {props.meal_name}
                    </h2>
                    <div className="Categories">
                    {
                        category.map(category => 
                        {
                            return <CATEGORY_MAPPER category = {category}/>
                        })
                    }
                    </div>
                </div>
            )
        }

        
        const comment = useRef("");

        const Add_Comment = () => {
            console.log(comment.current)
            fetch("/comment", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body: JSON.stringify({
                    hall_name: props.hall_name, 
                    comment: comment.current,
                })
            })
            .then(response => response.json())
            .then(data => {
                let message = document.getElementById(props.hall_name)
                if (data.error) {
                    message.innerHTML = data.error + "<br/>";
                }
                else {
                    message.innerHTML = data.message + "<br/>";
                }
            })
        }
        const [likes, setLikes] = useState(0)

        useEffect(() => {
            fetch("/retrievelikes", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body: JSON.stringify({
                    hall_name: props.hall_name, 
                })
            })
            .then(response => response.json())
            .then(data => {
                let message = document.getElementById(props.hall_name)
                if (data.error) {
                    message.innerHTML = data.error + "<br/>";
                }
                else {
                    setLikes(data.likes)
                }
            })
        },[]); 

        const Like = () => {
            fetch("/like", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body: JSON.stringify({
                    hall_name: props.hall_name, 
                })
            })
            .then(response => response.json())
            .then(data => {
                let message = document.getElementById(props.hall_name)
                if (data.error) {
                    message.innerHTML = data.error + "<br/>";
                }
                else {
                    message.innerHTML = data.message + "<br/>";
                    setLikes(data.likes)
                }
            })
        }

        return (
            <div className="Halls">
                <h2>
                {props.hall_name}
                <br/>
                <button className="upvote" onClick={ () => Like() }><img src={up} className="upvote"></img></button>
                <br/>
                <input type="text" placeholder="comment" onChange={ (e) => {comment.current = e.target.value} }/>
                <button className="button navopt" id="submit_button" onClick={ () => Add_Comment() }>Add Comment</button>
                <br/>
                <span id={props.hall_name}></span>
                </h2>
                <div className="flaot-container">
                    <div className="hallName">
                        {
                            menus.map(menus => 
                            {
                                return <MENU_MAPPER meal_name = {menus.meal} hall_name = {props.hall_name}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                halls.map(halls => 
                {
                    return <HALL_MAPPER hall_name = {halls.name} hall_id = {halls.id}/>
                })
            }
        </div>
    )
}
/////////////////////////////////////////

export default Menu