import "./navBar.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { userSelectors } from "../../store/userSlice";
function NavBar() {
  const { user } = useSelector(userSelectors);

  return (
    <div className={"NavBar-container"}>
      <div className={"NavBar-span-start"}>
        <NavLink
          className={"NavBar-Link"}
          activeStyle={{ color: "black" }}
          exact
          to="/"
        >
          <span className={"NavBar-span-start"}>
            <img
              src="https://img.icons8.com/cotton/64/000000/key--v1.png"
              alt="logo"
            />
            <span className={"NavBar-logo-name"}>Hommies</span>
          </span>
        </NavLink>
        <NavLink
          className={"NavBar-Link"}
          activeStyle={{ color: "black" }}
          exact
          to="/chat"
        >
          Chat
        </NavLink>
        {!user.isOwner &&
          <NavLink
            className={"NavBar-Link"}
            activeStyle={{ color: "black" }}
            exact
            to="/likes"
          >
            Likes
          </NavLink>
        }
      </div>
      <div className={"NavBar-span-end"}>
        <span className={"NavBar-Link"}>
          <Profile />
        </span>
      </div>
    </div>
  );
}

export default NavBar;
