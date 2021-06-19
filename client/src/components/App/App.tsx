import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import {TypedUseSelectorHook, useSelector } from "react-redux"
import NavBar from "../Navbar/NavBar"
import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import { useAppSelector, useAppDispatch } from "../../interfaces/interface"

function App() {
  const isLogged = useAppSelector(state => state.authSlice)
  const dispatch = useAppDispatch()

  return (
    <div className="App">
    {!isLogged ?
      <Switch>
        <Route exact path="/" component={SignIn}/>
        <Route exact path="/sign-up" component={SignUp}/>
      </Switch>
    :
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/profile" component={Profile}/>
      </Switch>
    </>
  }
    
    </div>
  );
}

export default App;