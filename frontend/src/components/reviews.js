import { React, useState } from "react";
import Select from 'react-select';


const Reviews = () => {
    const [hall_name, sethall_name] = useState("");
    const [hall_comments_arr, sethall_comments_arr] = useState([]);
    
    const hall_options = [
        { value: "aa", label: "Baits Em Mgifts" },
        { value: "ab", label: "Berts Cafe" },
        { value: "ac", label: "Blue Cafe East Quad" },
        { value: "ad", label: "Blue Cafe North Quad" },
        { value: "ae", label: "Blue Cafe South Quad" },
        { value: "af", label: "Blue Market Bursle" },
        { value: "ag", label: "Blue Market Munger" },
        { value: "ah", label: "Blue Market Pierpont" },
        { value: "ai", label: "Blue Market Union" },
        { value: "aj", label: "Bursley Dining Hall" },
        { value: "ak", label: "Bursley Mdining To Go" },
        { value: "al", label: "Cafe 32" },
        { value: "am", label: "Cafe Eigen" },
        { value: "an", label: "Ccrb Mdining To Go" },
        { value: "ao", label: "East Mdining To Go" },
        { value: "ap", label: "East Quad Dining Hall" },
        { value: "aq", label: "East Quad Mdining To Go" },
        { value: "ar", label: "Eigen Cafe" },
        { value: "as", label: "Field Hospital" },
        { value: "at", label: "Fields Cafe" },
        { value: "au", label: "Fireside Cafe" },
        { value: "ab", label: "Fireside Roast" },
        { value: "aw", label: "Java Blu At Sab" },
        { value: "ax", label: "Java Blu At Sph" },
        { value: "ay", label: "Java Blu At Taubman" },
        { value: "az", label: "Kosher Sq Mdining To Go" },
        { value: "ba", label: "Lawyers Club Dining Hall" },
        { value: "bb", label: "Maizies" },
        { value: "bc", label: "Markley Dining Hall" },
        { value: "bd", label: "Martha Cook Dining Hall" },
        { value: "be", label: "Mich Burger" },
        { value: "bf", label: "Michigan League Mdining To Go" },
        { value: "bg", label: "Michigan Union Mdining To Go" },
        { value: "bh", label: "Mojo Blue Cafe And Market" },
        { value: "bi", label: "Mojo Mdining To Go" },
        { value: "bj", label: "Mosher Jordan Dining Hall" },
        { value: "bk", label: "Mujo Cafe" },
        { value: "bl", label: "Ncrb Mdining To Go" },
        { value: "bm", label: "North Quad Dining Hall" },
        { value: "bn", label: "Pantry At Markley" },
        { value: "bo", label: "Petrovich Family Grill" },
        { value: "bp", label: "Pierpont Commons Mdining To Go" },
        { value: "bq", label: "South Mdining To Go" },
        { value: "br", label: "South Quad Dining Hall" },
        { value: "bs", label: "South Quad Mdining To Go" },
        { value: "bt", label: "Twigs At Oxford" },
        { value: "bu", label: "Ugos League" },
        { value: "bv", label: "Ugos Union" },
        { value: "bw", label: "Umma Cafe" },
    ];
    
    const Post = () => {
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify({
                hall_name,
            }),
        })
        .then( (response) => response.json())
        .then( (resJson) => {
            let message = document.getElementById("message");
            if (resJson.error) {
                message.innerHTML = resJson.error + "<br/>";
            }
            else {
                sethall_comments_arr(resJson.reviews);
                message.innerHTML = "";;
            };
        })
        .catch( (error) => {
            console.log(error);
        });
    };

    const HALL_REVIEWS_MAPPER = (props) => {
        return (
            <h3>
                {props.reviews}
            </h3>
        );
    };

    return (
        <div>
            <Select
            options={hall_options}
            onChange={opt => sethall_name(opt.label)}
            placeholder="Select Dining Hall"
            />
            <br/>
            
            <span className="com" id="message"></span>
            <button className="button navopt" id="submit_button" onClick={ () => Post() }>View Reviews</button>
            <div>
                {
                    hall_comments_arr.map((halls) => {
                        return <HALL_REVIEWS_MAPPER reviews = {halls} />
                    })
                }
            </div>
        </div>
    );
};

export default Reviews;