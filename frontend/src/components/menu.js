import { React, useRef } from "react";
import { useState, useEffect } from 'react';
import up from "./assets/up.png";

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + ('0' + (today.getDate())).slice(-2);

const Menu = () => {
    const [halls, setHalls] = useState([]);
    
    // Fetching Hall
    useEffect( () => {
            // NOTE: TWO URL FOR THE API EXISTS. USE WHAT IS NOT BROKEN.
        fetch("https://michigan-dining-api.tendiesti.me/v1/diningHalls")
        //fetch("https://michigan-dining-api.herokuapp.com/v1/diningHalls")
        .then( (response) => response.json())
        .then( (resJson) => {
            setHalls(resJson.diningHalls);
        })
        .catch( (error) => {
            console.log(error);
        });
    },[]); 

    // Mapping halls
    const HALL_MAPPER = (props) => {
        let [menus, setMenus] = useState([]);

        //fetching meal
        useEffect( () => {
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
            });
        },[]); 

        // Mapping Menu
        const MENU_MAPPER = (props) => {
            const [category, setCategory] = useState([]);

            //fetching category
            useEffect( () => {
                fetch("https://michigan-dining-api.tendiesti.me/v1/menus?date=" + date + "&diningHall=" + props.hall_name.replaceAll(" ", "%20") + "&meal=" + props.meal_name.replaceAll(" ", "%20"))
                // fetch("https://michigan-dining-api.herokuapp.com/v1/menus?date=" + date + "&diningHall=" + props.hall_name.replaceAll(" ", "%20") + "&meal=" + props.meal_name.replaceAll(" ", "%20"))
                .then( (response) => response.json())
                .then( (resJson) => {
                    if (resJson.menus[0].category) {
                        setCategory(resJson.menus[0].category);
                    };
                })
                .catch( (error) => {
                    console.log(error);
                });
            },[]);

            const CATEGORY_MAPPER = (props) => {
                
                const ITEM_MAPPER = (props) => {

                    const NUTRITION_MAPPER = (props) => {
                        let name = props.nutritionalInfo.name;
                        let value = "";
                        let units = "";
                        
                        if (props.nutritionalInfo.value) {
                            value = props.nutritionalInfo.value;
                        };
                        if (props.nutritionalInfo.units) {
                            units = props.nutritionalInfo.units;
                        };

                        return (
                            <div> {name + ": " + value + units } </div>
                        );
                    };

                    // Modified this to add nutrional info
                    const Add_to_Plan = () => {
                        fetch("/addfood", {
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json",
                                "Accept":"application/json",
                            },
                            body: JSON.stringify({
                                menuItem: props.menuItem,
                                username: localStorage.username,
                                password: localStorage.password,
                            }),
                        })
                        .then( (response) => response.json())
                        .then( (resJson) => {
                            let message = document.getElementById(props.menuItem.name);
                            if (resJson.error) {
                                message.innerHTML = resJson.error + "<br/>";
                            }
                            else {
                                message.innerHTML = resJson.message + "<br/>";
                            };
                        })
                        .catch( (error) => {
                            console.log(error);
                        });
                    };
                    
                    if (props.menuItem.itemSizes[0].nutritionalInfo) {
                        return (
                            <div>
                                <h3 className="mealname">
                                {props.menuItem.name}  
                                <button className="button navopt marg" id="submit_button" onClick={ () => Add_to_Plan() }>Add to Plan</button>
                                </h3>
                                <span id={props.menuItem.name}></span>
                                <div className ="info">
                                    {
                                        props.menuItem.itemSizes[0].nutritionalInfo.map( (nutritionalInfo) =>
                                            {
                                                return <NUTRITION_MAPPER nutritionalInfo = {nutritionalInfo}/>
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <h4>
                                {props.menuItem.name}
                                <button className="button navopt">Add</button>
                                </h4>
                            </div>
                        )};
                };

                return (
                    <div>
                        <h2 className="mtype">
                            {props.category.name}
                        </h2>
                        <div className="Items">
                        {
                            props.category.menuItem.map( (menuItem) => 
                            {
                                return <ITEM_MAPPER menuItem = {menuItem}/>
                            })
                        }
                        </div>
                    </div>
                );
            };
            
            return (
                <div className="ib">
                    <h2 className="meal">
                    {props.meal_name}
                    </h2>
                    <div className="Categories">
                    {
                        category.map( (category) => 
                        {
                            return <CATEGORY_MAPPER category = {category}/>
                        })
                    }
                    </div>
                </div>
            );
        };

        const comment = useRef("");

        const Add_Comment = () => {
            fetch("/comment", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body: JSON.stringify({
                    hall_name: props.hall_name, 
                    comment: comment.current,
                }),
            })
            .then( (response) => response.json())
            .then( (resJson) => {
                let message = document.getElementById(props.hall_name);
                if (resJson.error) {
                    message.innerHTML = resJson.error + "<br/>";
                }
                else {
                    message.innerHTML = resJson.message + "<br/>";
                };
            })
            .catch( (error) => {
                console.log(error);
            });
        };

        const [likes, setLikes] = useState(0);

        useEffect( () => {
            fetch("/retrievelikes", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body: JSON.stringify({
                    hall_name: props.hall_name, 
                }),
            })
            .then( (response) => response.json())
            .then( (resJson) => {
                let message = document.getElementById(props.hall_name);
                if (resJson.error) {
                    message.innerHTML = resJson.error + "<br/>";
                }
                else {
                    setLikes(resJson.likes);
                };
            })
            .catch( (error) => {
                console.log(error);
            });
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
                    username: localStorage.username,
                }),
            })
            .then( (response) => response.json())
            .then( (resJson) => {
                let message = document.getElementById(props.hall_name)
                if (resJson.error) {
                    message.innerHTML = resJson.error + "<br/>";
                }
                else {
                    message.innerHTML = resJson.message + "<br/>";
                    setLikes(resJson.likes);
                }
            })
            .catch( (error) => {
                console.log(error);
            });
        };
        
        const [view, setView] = useState(0);

        const view_menu = () => {
            setView(!view);
        };

        if (view) {
            return (
                <div className="Halls">
                    <h1 >
                    <div className="hname">    
                     {props.hall_name}
                    </div>
                    {likes}
                    <button className="upvote" onClick={ () => Like() }><img src={up} className="upvote"></img></button>
                    <br/>
                    <input type="text" placeholder="comment" onChange={ (e) => {comment.current = e.target.value} }/>
                    <br/>
                    <button className="button navopt" id="submit_button" onClick={ () => Add_Comment() }>Add Comment</button>
                    <button className="button navopt viewmenu" onClick={ () => view_menu() }>Hide Menu</button>
                    <br/>
                    <span id={props.hall_name}></span>
                    </h1>
                    
                        <div className="hallName">
                            {
                                menus.map( (menus) => 
                                {
                                    return <MENU_MAPPER meal_name = {menus.meal} hall_name = {props.hall_name}/>
                                })
                            }
                        </div>
                </div>
                
            );
        } else {
            return (
                <div className="Halls">
                    <h1 >
                    <div className="hname">    
                     {props.hall_name}
                    </div>
                    {likes}
                    <button className="upvote" onClick={ () => Like() }><img src={up} className="upvote"></img></button>
                    <br/>
                    <input type="text" placeholder="comment" onChange={ (e) => {comment.current = e.target.value} }/>
                    <br/>
                    <button className="button navopt" id="submit_button" onClick={ () => Add_Comment() }>Add Comment</button>
                    <button className="button navopt viewmenu" onClick={ () => view_menu() }>View Menu</button>
                    <br/>
                    <span id={props.hall_name}></span>
                    </h1>
                </div>     
            );
        };
    };

    // Sorts Halls
    const sorted_halls = halls.slice().sort( (a, b) => {
        let x = a.name;
        let y = b.name;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    const [sort, setSort] = useState(0);

    const Sort_Halls = () => {
        setSort(!sort);
    };

    if (sort) {
        return (
            <div> 
                <button className="button navopt sortbut" onClick={ () => Sort_Halls() }>Unsort</button>
                {
                    sorted_halls.map( (halls) => 
                    {
                        return <HALL_MAPPER hall_name = {halls.name} hall_id = {halls.id}/>
                    })
                }
            </div>
        );
    } else {
        return (
            <div>
                <button className="button navopt sortbut" onClick={ () => Sort_Halls() }>A-Z Sort</button>
                {
                    halls.map( (halls) => 
                    {
                        return <HALL_MAPPER hall_name = {halls.name} hall_id = {halls.id}/>
                    })
                }
            </div>
        );
    };
};


export default Menu;