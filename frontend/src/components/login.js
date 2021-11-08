import React, { useState } from "react";

const Login = () => {
    const [username, Username] = useState("");
    const [password, Password] = useState("");

    const Post = () => {
        fetch("/login", {
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
            var message = document.getElementById("message")
            if (data.error) {
                message.innerHTML = data.error + "<br/>";
            }
            else {
                window.location.href = './';
            }
        })
    }

    return (
        <div>
            <input type="text" placeholder="username" value={username} onChange={ (e) => Username(e.target.value) }/>
            <br/>
            <input type="text" placeholder="password" value={password} onChange={ (e) => Password(e.target.value) }/>
            <br/>
            <span id="message"></span>
            <button id="submit_button" onClick={ () => Post() }>Log in</button>
        </div>
    )
}

export default Login