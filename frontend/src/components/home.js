import { React, useState, useEffect } from "react";
import Chart from "react-google-charts";


const Home = () => {
    const [visible, setVisible] = useState(false);
    const [foods, setFoods] = useState([]);
    const [updated, setUpdated] = useState(0);
    let Calories = 0;
    let Total_Fat = 0;
    let Saturated_Fat = 0;
    let Trans_Fat = 0;
    let Cholesterol = 0;
    let Sodium = 0;
    let Total_Carbohydrate = 0;
    let Dietary_Fiber = 0;
    let Sugars = 0;
    let Protein = 0;

    const username = localStorage.username;
    const password = localStorage.password;

    // If logged out refresh page and clear user
    const Log_Out = () => {
        delete localStorage.username;
        window.location.href = './';
    };
    // Gets user's food
    useEffect( () => {
        fetch("/plan", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        .then( (response) => response.json())
        .then( (resJson) => {
            let message = document.getElementById("message");
            if (resJson.foods) {
                setFoods(resJson.foods);
                message.innerHTML = "";
            } else {
                message.innerHTML = resJson.error + "<br/>";
            };
        })
        .catch( (error) => {
            console.log(error);
        });
    },[updated]); 

    // Totals nutritional values
    for (let i = 0; i < foods.length; i++) {
        if (foods[i].nutritionalInfo[0].value) {Calories += foods[i].nutritionalInfo[0].value};
        if (foods[i].nutritionalInfo[1].value) {Total_Fat += foods[i].nutritionalInfo[1].value};
        if (foods[i].nutritionalInfo[2].value) {Saturated_Fat += foods[i].nutritionalInfo[2].value};
        if (foods[i].nutritionalInfo[3].value) {Trans_Fat += foods[i].nutritionalInfo[3].value};
        if (foods[i].nutritionalInfo[4].value) {Cholesterol += foods[i].nutritionalInfo[4].value};
        if (foods[i].nutritionalInfo[5].value) {Sodium += foods[i].nutritionalInfo[5].value};
        if (foods[i].nutritionalInfo[6].value) {Total_Carbohydrate += foods[i].nutritionalInfo[6].value};
        if (foods[i].nutritionalInfo[7].value) {Dietary_Fiber += foods[i].nutritionalInfo[7].value};
        if (foods[i].nutritionalInfo[8].value) {Sugars += foods[i].nutritionalInfo[8].value};
        if (foods[i].nutritionalInfo[9].value) {Protein += foods[i].nutritionalInfo[9].value};
    };

    const FOOD_MAPPER = (props) => {
        // Maps nutrition info into food mapper gets nutritional info and if it has any info returns it all together
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

    // Added for Remove Button
    const Remove_from_plan = () => {
        fetch("/removefood", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                },
                body: JSON.stringify({
                    menuItem: props.foods,
                    username: localStorage.username,
                }),
            })
            .then( (response) => response.json())
            .then( (resJson) => {
                setUpdated(updated + 1)
            })
            .catch( (error) => {
                console.log(error);
            });
        };


        // Returns div with added food and info
        return (
            <div className ="daily ib">
                <h3 >
                    {props.foods.name}
                    <br/>
                    <button className="button navopt" onClick={ () => Remove_from_plan() }>Remove</button>
                </h3>
                {            
                    props.foods.nutritionalInfo.slice(0,10).map( (nutritionalInfo) => {
                        return <NUTRITION_MAPPER nutritionalInfo = {nutritionalInfo}/>
                    })
                }
                <br/>
            </div>
        );
    };
    // Wipes all meals from user's storage
        const Clear_All = () => {
            fetch("/clearall", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body: JSON.stringify({
                    username: localStorage.username,
                }),
            })
            .then( (response) => response.json())
            .then( (resJson) => {
                setUpdated(updated + 1)
            //     let message = document.getElementById(props.menuItem.name)
            //     if (data.error) {
            //         message.innerHTML = data.error + "<br/>";
            //     }
            //     else {
            //         message.innerHTML = data.message + "<br/>";
            //     }
            })
            .catch( (error) => {
                console.log(error);
            });
        };


    

    return (
        <div className ="center">
            <h1 className ="hname">Home</h1>
            <h2>
                <button className="button navopt"onClick = { () => Log_Out() }>Log out</button>
            </h2>
            <div className ="ib2">
                {/* Total */}
                <div className="d2">
                    <h3>Daily Total</h3>
                    Calories: {Calories} cal
                    <br/>
                    Total Fat: {Total_Fat} m
                    <br/>
                    Saturated Fat: {Saturated_Fat} m
                    <br/>
                    Trans Fat: {Trans_Fat} m
                    <br/>
                    Cholesterol: {Cholesterol} g
                    <br/>
                    Sodium: {Sodium} g
                    <br/>
                    Total Carbs: {Total_Carbohydrate} m
                    <br/>
                    Dietary Fiber: {Dietary_Fiber} m
                    <br/>
                    Sugars: {Sugars} m
                    <br/>
                    Protein: {Protein} m
                    <br/>
                    <button className="button navopt" onClick={ () => Clear_All() }>Clear Plan</button>
                </div>
                <div className = "center">
                    <br/>
                    {/* On click changes state to opposite to act as switch */}
                    <button className="button navopt" onClick={() => setVisible(!visible)}>
                        {visible ? 'Hide': 'Show Graph'}
                    </button>
                    {/* If button is clicked displays div */}
                    {visible && <div>
                        
                    <Chart
                    width={'680px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Nutrition', 'Value'],
                        ['Total Fat', Total_Fat],
                        ['Saturated Fat', Saturated_Fat],
                        ['Trans Fat', Trans_Fat],
                        ['Total Carbs', Total_Carbohydrate],
                        ['Dietary Fiber', Dietary_Fiber],
                        ['Sugars', Sugars],
                        ['Protein', Protein],
                    ]}
                    options={{
                        backgroundColor: 'rgb(97, 191, 223)',
                        legend: {
                            textStyle: { color: 'black', 
                            fontSize: 18   },
                        },
                        is3D: true,
                    }}
                    rootProps={{ 'data-testid': '1' }}
                    />
                    </div>}
                </div>
                <br/>
                </div>
            <br/>

            <span className="increase"id="message"></span>
            {/* Foods with info */}
            <div className="ib" >
                {            
                    foods.map( (foods) => {
                        return <FOOD_MAPPER foods = {foods}/>
                    })
                }
            </div>
        </div>
    );
};


export default Home;