import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";
import { userSelectors } from "../../store/userSlice";
import { setIsLogged } from "../../store/authSlice";
import {
  setIsprofileClicked,
  profileSelectors,
} from "../../store/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import netwrok from "../../utils/network";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isprofileClicked } = useSelector(profileSelectors);
  const { user } = useSelector(userSelectors);
  const [showInfo, setShowInfo] = useState(false);
  // const getUserImg = async () => {
  //   const url = await netwrok.get(`/user/profile-image/${user.imgUrl}`);
  //   return url;
  // };
  // useEffect(() => {});

  const logOutHandler = () => {
    dispatch(setIsLogged({ isLogged: false }));
    dispatch(setIsprofileClicked({ isprofileClicked: !profileSelectors }));
    Cookies.remove("token");
    history.push("/");
  };
  const clickHandler = () => {
    setShowInfo((prev) => !prev);
    dispatch(setIsprofileClicked({ isprofileClicked: !isprofileClicked }));
  };
  return (
    <div className="Profile-container">
      <span className="Profile-navbar" onClick={clickHandler}>
        {user.imgUrl ? <img src={user.imgUrl} alt="profile" /> : "Profile"}
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
