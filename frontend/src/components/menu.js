import React from "react";

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();


let halls_arr = null;

var halls = fetch("https://api.yalemenus.com/halls")
halls
.then( (response) => response.json())
.then( (resJson) => {
    console.log(resJson)
    return halls_arr = resJson;
})
.catch( (error) => {
    console.log(error);
})

// const Meal = () => {
//     return (
//         <div className="Meals">
//             { 
//             halls_arr.map(hall => 
//                 {
//                     return <Dining_halls
//                     hall_name = {hall.name}
//                     hall_id = {hall.id}
//                     />
//                 })
//             }
//         </div>
//     )
// }




// Function that gets mapped
function Dining_halls(props) {
    var today_meal = []
    
    const meal_fetcher = () => {
        fetch("https://api.yalemenus.com/halls/" + props.hall_id + "/meals?date=" + date)
        .then( (response) => response.json())
        .then( (resJson) => {
            console.log(resJson)
            today_meal = resJson
        })
        .catch( (error) => {
            console.log(error);
        })
    }

    meal_fetcher();

    function Mealfunc(props) {
        <div>
            {props.meal_name}
        </div>
    }

    //
    // const Meals = () => {
    //     return (
    //         today_meal[0]
    //     )
    // // }

    return (
        <div>
            {props.hall_name}
            {today_meal[1]}
        </div>
    )
}

// Mapper
const Menu = () => {
    return (
        <div className="Halls">
            { 
            halls_arr.map(hall => 
                {
                    return <Dining_halls
                    hall_name = {hall.name}
                    hall_id = {hall.id}
                    />
                })
            }
        </div>
    )
}


export default Menu