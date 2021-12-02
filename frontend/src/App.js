import React from "react";
import "./App.css";
import Navbar from "./components/navbar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import Home from "./components/home.js";
import Signup from "./components/signup.js";
import Login from "./components/login.js";
import Menu from "./components/menu.js";
import Reviews from "./components/reviews.js"
import "./components/comp.css";


function App() {
  return (
    <div className="application">
      <Helmet>
        <title>OurMeal</title>
      </Helmet>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/reviews" element={<Reviews/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;
