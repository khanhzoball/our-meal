import React from "react";
import "./App.css";
import Navbar from "./components/navbar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home.js";
import Signup from "./components/signup.js";
import Login from "./components/login.js";
import Menu from "./components/menu.js";



function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/menu" element={<Menu/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
