import "./navBar.css"
import React from "react";
import { BrowserRouter, Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home'

function NavBar () {
    return (
        <div>
            <NavLink activeStyle={{color:'green'}} exact to="/home">Home</NavLink>
            <NavLink activeStyle={{color:'green'}} exact to="/profile">Profile</NavLink>
        </div>
    )
}

export default NavBar


