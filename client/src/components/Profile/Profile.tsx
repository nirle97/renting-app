import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";
import { userSelectors, setUser } from "../../store/userSlice";
import { setIsLogged } from "../../store/authSlice";
import {
  setIsprofileClicked,
  profileSelectors,
} from "../../store/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import network from "../../utils/network";
import { setIsDataLoading } from "../../store/spinnerSlice";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isprofileClicked } = useSelector(profileSelectors);
  const { user } = useSelector(userSelectors);
  const [showInfo, setShowInfo] = useState(false);

  const getUserImg = async () => {
    try {
      dispatch(setIsDataLoading({ isDataLoading: true }));

      const url = await network.get(
        `${process.env.REACT_APP_BASE_URL}/user/profile-image/${user.imgUrl}`
      );
      dispatch(setUser({ ...user, imgUrl: url }));
      dispatch(setIsDataLoading({ isDataLoading: false }));
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  };

  useEffect(() => {
    if (user.imgUrl === "") {
      getUserImg();
    }
  }, []);

  const logOutHandler = () => {
    dispatch(setIsLogged({ isLogged: false }));
    dispatch(setIsprofileClicked({ isprofileClicked: !profileSelectors }));
    Cookies.remove("token");
    Cookies.remove("id");
    history.push("/");
  };
  const clickHandler = () => {
    setShowInfo((prev) => !prev);
    dispatch(setIsprofileClicked({ isprofileClicked: !isprofileClicked }));
  };

  return (
    <div className="Profile-container">
      <span className="Profile-navbar" onClick={clickHandler}>
        {user.imgUrl ? (
          <img
            src={`${process.env.REACT_APP_BASE_URL}${user.imgUrl}`}
            alt="profile"
          />
        ) : (
          <img src="/images/user-img.png" alt="profile" />
        )}
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
