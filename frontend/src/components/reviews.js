import React, { useState } from "react";

const Reviews = () => {
    const [hall_name, sethall_name] = useState("");
    const [hall_comments_arr, sethall_comments_arr] = useState([]);

    const Post = () => {
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify({
                hall_name,
            })
        })
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson)
            let message = document.getElementById("message")
            if (resJson.error) {
                message.innerHTML = resJson.error + "<br/>";
            }
            else {
                sethall_comments_arr(resJson.reviews)
            }
        })
    }

    const HALL_REVIEWS_MAPPER = (props) => {
        return (
            <h3>
                {props.reviews}
            </h3>
        )
    }

    return (
        <div>
            <input type="text" placeholder="Dining Hall name" value={hall_name} onChange={ (e) => sethall_name(e.target.value) }/>
            <br/>
            <span id="message"></span>
            <button id="submit_button" onClick={ () => Post() }>View Reviews</button>
            <div>
                {
                    hall_comments_arr.map((halls) => {
                        return <HALL_REVIEWS_MAPPER reviews = {halls} />
                    })
                }
            </div>
        </div>
    )
}

export default Reviews