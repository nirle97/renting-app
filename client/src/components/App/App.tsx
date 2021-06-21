import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import { setIsLogged, RootState, authSelectors } from "../../store/authSlice"
import NavBar from "../Navbar/NavBar";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
function App() {
  // const isLogged = true;
  
  const { isLogged } = useSelector(authSelectors);

  return (
    <div className="App">
      {!isLogged ? (
        <>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        </>
      ) : (
        <>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
