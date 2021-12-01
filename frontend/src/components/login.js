import { React, useState } from "react";

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
            }),
        })
        .then( (response) => response.json())
        .then( (resJson) => {
            let message = document.getElementById("message");
            if (resJson.error) {
                message.innerHTML = resJson.error + "<br/>";
            }
            else {
                localStorage.setItem("username", resJson.username);
                window.location.href = './';
            };
        });
    };

    return (
        <div>
            <input type="text" placeholder="username" value={username} onChange={ (e) => setUsername(e.target.value) }/>
            <br/>
            <input type="password" placeholder="password" value={password} onChange={ (e) => setPassword(e.target.value) }/>
            <br/>
            <span id="message"></span>
            <button className="button navopt" id="submit_button" onClick={ () => Post() }>Log in</button>
        </div>
    );
};

export default Login;