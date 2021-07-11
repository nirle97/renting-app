import "./navBar.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useSelector } from "react-redux";
import { userSelectors } from "../../store/userSlice";
import { spinnerSelectors } from "../../store/spinnerSlice";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 

function NavBar() {
  const { user } = useSelector(userSelectors);
  const { isDataLoading } = useSelector(spinnerSelectors);
  const search = useLocation().pathname;
  return (
    <>
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
          <Tippy content="Chat">
            <NavLink
              className="NavBar-Link"
              activeStyle={{ color: "black" }}
              exact
              to="/chat"
              >
              <span className="NavBar-Link-icon">
                <i className="fas fa-comments"></i>
              </span>
            </NavLink>
          </Tippy>
          {!user.isOwner && (
            <Tippy content="Likes">
              <NavLink
                className="NavBar-Link"
                activeStyle={{ color: "black" }}
                exact
                to="/likes"
                >
                <span className="NavBar-Link-icon">
                  <i className="fas fa-heart"></i>
                </span>
              </NavLink>
            </Tippy>
          )}
        </div>
        <div className="NavBar-div-end">
          <span className="NavBar-Link">
            <Profile />
          </span>
          {isDataLoading && (
            <img
              className="NavBar-spinner"
              src="/images/spinner.gif"
              alt="spinner"
            />
          )}
        </div>
      </div>
      {
        user.isOwner &&
        search === "/" && 
          <Link className="UploadApt-Link" to="/upload-apt">
          <span
            className="UploadApt-plus"
          >
            <i className="fas fa-plus-circle"></i>
          </span>
          </Link>
      }
    </>
  );
}

export default NavBar;
