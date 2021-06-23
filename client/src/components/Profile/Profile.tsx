import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./profile.css";
import { userSelectors } from "../../store/userSlice";
import { setIsLogged } from "../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(userSelectors);
  const [showInfo, setShowInfo] = useState(false);

  const logOutHandler = () => {
    dispatch(setIsLogged({ isLogged: false }));
    Cookies.remove("token");
    history.push("/");
  };

  return (
    <div className="Profile-container">
      <span
        className="Profile-navbar"
        onClick={() => setShowInfo((prev) => !prev)}
      >
        Profile
      </span>
      {showInfo && (
        <div className="Profile-info-div">
          <span>Name: {user.fullName}</span>
          <span>Email: {user.email}</span>
          {user.phoneNumber && user.phoneNumber !== "" ? (
            <span>Phone: {user.phoneNumber}</span>
          ) : (
            <></>
          )}
          {user.age && user.age !== "" ? <span>Age: {user.age}</span> : <></>}
          <span id="Profile-log-out" onClick={logOutHandler}>
            <i className="fas fa-door-open"></i>log out
          </span>
        </div>
      )}
    </div>
  );
}

export default Profile;
