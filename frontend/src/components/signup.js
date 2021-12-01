import { React, useState } from "react";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const Post = () => {
        fetch("/signup", {
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

    return (
        <div>
            <input type="text" placeholder="username" value={username} onChange={ (e) => setUsername(e.target.value) }/>
            <br/>
            <input type="password" placeholder="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>
            <br/>
            <span className="increase txtcolor"id="message"></span>
            <button className="button navopt" id="submit_button" onClick={ () => Post() }>Sign up</button>
        </div>
    );
};

export default Signup;