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

    const Log_Out = () => {
        delete localStorage.username;
        window.location.href = './';
    };
    
    useEffect( () => {
        fetch("/plan", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify({
                username,
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
        });
    },[updated]); 


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
                    username: localStorage.username,
                }),
            })
            .then((response) => response.json())
            .then( (resJson) => {
                setUpdated(updated + 1)
            });
        };



        return (
            <div className ="daily ib">
                <h3 >
                    {props.foods.name}
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
            });
        };


    

    return (
        <div className ="center">
            <h1>Home</h1>
            <h2>
                <button onClick = { () => Log_Out() }>Log out</button>
            </h2>
            <div className ="ib2">
            <div className="d2">
            <h3>Daily Total</h3>
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
                <br/>
                <button className="button navopt" onClick={ () => Clear_All() }>Clear Plan</button>
            </div>
            <div className = "center">
                <button className="button navopt" onClick={() => setVisible(!visible)}>
                    {visible ? 'Hide': 'Show Graph'}
                </button>
                {visible && <div>
                    
                <Chart
                width={'500px'}
                height={'400px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Nutrition', 'Value'],
                    ['Total Fat', Total_Fat],
                    ['Saturated Fat', Saturated_Fat],
                    ['Trans Fat', Trans_Fat],
                    ['Cholesterol', Cholesterol],
                    ['Sodium', Sodium],
                    ['Total Carbohydrate', Total_Carbohydrate],
                    ['Dietary Fiber', Dietary_Fiber],
                    ['Sugars', Sugars],
                    ['Protein', Protein],
                ]}
                options={{
                    title: 'Daily Total',
                    backgroundColor: 'transparent',
                    legend: {
                        textStyle: { color: 'white' },
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
                />
                    </div>}
            </div>
            </div>
            <br/>
            <span id="message"></span>
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