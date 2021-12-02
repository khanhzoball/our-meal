import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

const Navbar = () => {
    return(
        <nav>
            <div className="topnav">
                <Link to="/"> <img src={logo} className="Our Meal Logo" />
                </Link>
                <Link to="/menu" className="navopt">Menu</Link>
                <Link to="/reviews" className="navopt">Reviews</Link>
                <Link to="/login" className="navopt">Login</Link>
                <Link to="/signup" className="navopt">Signup</Link> 
            </div>
        </nav>
    );
};

export default Navbar;