import "./navBar.css";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { userSelectors } from "../../store/userSlice";
function NavBar() {
  const { user } = useSelector(userSelectors);

  return (
    <div className="NavBar-container">
      <div className="NavBar-span-start">
        <Link id="NavBar-logo" className="NavBar-Link" to="/">
          <span className="NavBar-span-start">
            <img
              className="NaveBar-logo-img"
              src="/images/logo.png"
              alt="logo"
            />
          </span>
        </Link>
        <NavLink
          className="NavBar-Link"
          activeStyle={{ color: "black" }}
          exact
          to="/chat"
        >
          Chat
        </NavLink>
        {!user.isOwner && (
          <NavLink
            className="NavBar-Link"
            activeStyle={{ color: "black" }}
            exact
            to="/likes"
          >
            Likes
          </NavLink>
        )}
      </div>
      <div className="NavBar-span-end">
        <span className="NavBar-Link">
          <Profile />
        </span>
      </div>
    </div>
  );
}

export default NavBar;
