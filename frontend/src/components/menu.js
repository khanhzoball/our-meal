import React from "react";
import { useState, useEffect } from 'react';

    //             // nutritions JSON keys include
    //             /*
    //             calcium
    //             calcium_pdv
    //             calories
    //             cholesterol
    //             cholesterol_pdv
    //             dietary_fiber
    //             dietary_fiber_pdv
    //             iron
    //             iron_pdv
    //             item_id
    //             potassium
    //             potassium_pdv
    //             protein
    //             protein_pdv
    //             saturated_fat
    //             saturated_fat_pdv
    //             serving_size
    //             sodium
    //             sodium_pdv
    //             total_carbohydrate
    //             total_carbohydrate_pdv
    //             total_fat
    //             total_fat_pdv
    //             total_sugars
    //             total_sugars_pdv
    //             trans_fat
    //             trans_fat_pdv
    //             vitamin_a
    //             vitamin_a_pdv
    //             vitamin_c
    //             vitamin_c_pdv
    //             vitamin_d
    //             vitamin_d_pdv
    //             */

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + ('0' + today.getDate()).slice(-2);

const Menu = () => {
    var [halls, setHalls] = useState([]);
    
    // Fetching Hall
    useEffect(() => {
        async function getHallData() {
            const response = await fetch("https://michigan-dining-api.tendiesti.me/v1/diningHalls");
            const data = await response.json();
            setHalls(data.diningHalls) ;
        }

        getHallData();
    },[]); 

    // Mapping halls
    const HALL_MAPPER = (props) => {
        var [menus, setMenus] = useState([]);


        //fetching meal
        useEffect(() => {
            fetch("https://michigan-dining-api.tendiesti.me/v1/menus?date=" + date + "&diningHall=" + props.hall_name.replaceAll(" ", "%20"))
            .then( (response) => response.json())
            .then( (resJson) => {
                // console.log(resJson)
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
                .then( (response) => response.json())
                .then( (resJson) => {
                    // console.log(resJson)
                    if (resJson.menus[0].category) {
                        setCategory(resJson.menus[0].category)
                    }
                    // console.log("https://michigan-dining-api.tendiesti.me/v1/menus?date=" + date + "&diningHall=" + props.hall_name.replaceAll(" ", "%20") + "&meal=" + props.meal_name.replaceAll(" ", "%20"))
                    
                    
                })
                .catch( (error) => {
                    console.log(error);
                })
                // async function getMealData() {
                //     const response = await fetch("https://api.yalemenus.com/meals/" + props.meal_id + "/items");
                //     const data = await response.json();
                //     setitems(data) ;
                // }
        
                // getMealData();
            },[]);

            const CATEGORY_MAPPER = (props) => {
                // var [nutritions, setnutritions] = useState([]);

                // useEffect(() => {
                //     fetch("https://api.yalemenus.com/items/" + props.item_id + "/nutrition")
                //     .then( (response) => response.json())
                //     .then( (resJson) => {
                //         // console.log(resJson)
                //         setnutritions(resJson)
                //     })
                //     .catch( (error) => {
                //         console.log(error);
                //     })
                // },[]);
                
                const ITEM_MAPPER = (props) => {

                    
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
                    
                    if (props.menuItem.itemSizes[0].nutritionalInfo) {
                        return (
                            <div>
                                <h4>
                                {props.menuItem.name}
                                </h4>
                                <div>
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
                <div>
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

        return (
            <div>
                <h1>
                {props.hall_name}
                </h1>
                <div className="Meals">
                    {
                        menus.map(menus => 
                        {
                            return <MENU_MAPPER meal_name = {menus.meal} hall_name = {props.hall_name}/>
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="Halls">
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