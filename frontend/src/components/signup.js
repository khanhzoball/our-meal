import React, { useState } from "react";

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
            })
        })
        .then(response => response.json())
        .then(data => {
            let message = document.getElementById("message")
            if (data.error) {
                message.innerHTML = data.error + "<br/>";
            }
            else {
                message.innerHTML = data.message + "<br/>";
            }
        })
    }

    return (
        <div>
            <input type="text" placeholder="username" value={username} onChange={ (e) => setUsername(e.target.value) }/>
            <br/>
            <input type="text" placeholder="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>
            <br/>
            <span id="message"></span>
            <button id="submit_button" onClick={ () => Post() }>Sign up</button>
        </div>
    )
}

export default Signup