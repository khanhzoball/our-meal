import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("username", data.username)
                window.location.href = './';
            }
        })
    }

    return (
        <div>
            <input type="text" placeholder="username" value={username} onChange={ (e) => setUsername(e.target.value) }/>
            <br/>
            <input type="password" placeholder="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>
            <br/>
            <span id="message"></span>
            <button className="button navopt" id="submit_button" onClick={ () => Post() }>Log in</button>
        </div>
    )
}

export default Login