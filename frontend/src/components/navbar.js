import React from "react"
import {Link} from "react-router-dom"
import "./comp.css";
import logo from './assets/logo.png';

const Navbar = () => {
    return(
        <nav>
            <div className="topnav" >
                <Link to="/"><img className="resize" src={logo}></img></Link>
                <span> </span>
                <Link to="/menu" className="menu"> Menu</Link>
                <div className = "logsign">
                    <Link to="/signup">Signup</Link>
                </div>
                <div className = "logsign">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar