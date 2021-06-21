import "./navBar.css";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../Profile/Profile";
import { setIsLogged } from "../../store/authSlice"

function NavBar() {
  const history = useHistory();
  const [openedProfile, setOpenedProfile] = useState(false)
  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(setIsLogged({isLogged: false}))
    history.push("/")
  }
  return (
    <div className={"NavBar-container"}>
      <div className={"NavBar-span-start"}>
        <NavLink className={"NavBar-Link"} activeStyle={{ color: "black" }} exact to="/">
          <span className={"NavBar-span-start"}>
          <img src="https://img.icons8.com/cotton/64/000000/key--v1.png"/>
            <span className={"NavBar-logo-name"}>
              Hommies
            </span>
          </span>
        </NavLink>
        <NavLink className={"NavBar-Link"} activeStyle={{ color: "black" }} exact to="/chat">
          Chat
        </NavLink>
      </div>
      <div className={"NavBar-span-end"}>
        <span className={"NavBar-Link"} onClick={() => setOpenedProfile(prev => !prev)}>
        <Profile />
        </span>
        {openedProfile &&
          <span id="NavBar-log-out" onClick={logOutHandler}>
            <i className="fas fa-door-open"></i>log out
          </span>
        }
      </div>
    </div>
  );
}
// home    profile    chat     create  contact us sign out    


export default NavBar;
