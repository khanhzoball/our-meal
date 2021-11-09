import React from "react";
import { useState, useEffect } from 'react';

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

const Menu = () => {
    const [halls, sethalls] = useState([]);
  
    useEffect(() => {
        async function getHallData() {
            const response = await fetch("https://api.yalemenus.com/halls");
            const data = await response.json();
    
            sethalls(data) ;
        }

        getHallData();
    },[]); 

    const Hall_mapper = (props) => {
        const [meals, setmeals] = useState([]);

        useEffect(() => {
            fetch("https://api.yalemenus.com/halls/" + props.hall_id + "/meals?date=" + date)
            .then( (response) => response.json())
            .then( (resJson) => {
                // console.log(resJson)
                setmeals(resJson)
            })
            .catch( (error) => {
                console.log(error);
            })
            // async function getMealData() {
            //     const response = await fetch("https://api.yalemenus.com/halls/" + props.hall_id + "/meals?date=" + date);
            //     const data = await response.json();
            //     setmeals(data) ;
            // }
    
            // getMealData();
        },[]); 

        const Meal_mapper = (props) => {
            const [items, setitems] = useState([]);

            useEffect(() => {
                fetch("https://api.yalemenus.com/meals/" + props.meal_id + "/items")
                .then( (response) => response.json())
                .then( (resJson) => {
                    // console.log(resJson)
                    setitems(resJson)
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

            const Item_mapper = (props) => {
                const [nutritions, setnutritions] = useState([]);

                useEffect(() => {
                    fetch("https://api.yalemenus.com/items/" + props.item_id + "/nutrition")
                    .then( (response) => response.json())
                    .then( (resJson) => {
                        // console.log(resJson)
                        setnutritions(resJson)
                    })
                    .catch( (error) => {
                        console.log(error);
                    })
                },[]);
                

                // nutritions JSON keys include
                /*
                calcium
                calcium_pdv
                calories
                cholesterol
                cholesterol_pdv
                dietary_fiber
                dietary_fiber_pdv
                iron
                iron_pdv
                item_id
                potassium
                potassium_pdv
                protein
                protein_pdv
                saturated_fat
                saturated_fat_pdv
                serving_size
                sodium
                sodium_pdv
                total_carbohydrate
                total_carbohydrate_pdv
                total_fat
                total_fat_pdv
                total_sugars
                total_sugars_pdv
                trans_fat
                trans_fat_pdv
                vitamin_a
                vitamin_a_pdv
                vitamin_c
                vitamin_c_pdv
                vitamin_d
                vitamin_d_pdv
                */

                return (
                    <div>
                        {props.item_name}
                        {/* {nutritions.serving_size} */}
                    </div>
                )
            }
            
            return (
                <div>
                    <h2>
                    {props.meal_name}
                    </h2>
                    <div className="Items">
                    {
                        items.map(item => 
                        {
                            return <Item_mapper item_name = {item.name} item_id = {item.id}/>
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
                        meals.map(meal => 
                        {
                            return <Meal_mapper meal_name = {meal.name} meal_id = {meal.id}/>
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="Halls">
            {
                halls.map(hall => 
                {
                    return <Hall_mapper hall_name = {hall.name} hall_id = {hall.id}/>
                })
            }
        </div>
    )
}
/////////////////////////////////////////

export default Menu