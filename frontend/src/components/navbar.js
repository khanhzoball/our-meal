import React from "react"
import {Link} from "react-router-dom"

const Navbar = () => {
    return(
        <nav>
            <div className="topnav">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/reviews">Reviews</Link>
            </div>
        </nav>
    )
}

export default Navbar