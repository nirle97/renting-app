import React, { useState } from "react";
import "./signUp.css";
import network from "../../utils/network";
import { useHistory } from "react-router-dom";
import { IUser } from "../../interfaces/interface";
import FormValidation from "../../utils/formValidation";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { setIsLogged } from "../../store/authSlice";
import { setUser } from "../../store/userSlice";
import Cookies from "js-cookie";

function SignUp() {
  const dispatch = useDispatch();
  const [emptyFldMsg, setEmptyFldMsg] = useState(false);
  const [formInput, setFormInput] = useState<IUser>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    age: "",
    imgUrl: "",
  });
  const history = useHistory();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.name]:
        e.target.name === "age" ? Number(e.target.value) : e.target.value,
    });
  };
  const registerUser = async (e: any) => {
    try {
      e.preventDefault();
      if (FormValidation.isFormValid(formInput)) {
        await network.post("/login/sign-up", formInput);
        history.push("/");
      } else {
        setEmptyFldMsg(true);
      }
    } catch (e) {
      console.error(e);
      setEmptyFldMsg(true);
    }
  };

  const handleGoogle = async (user: any) => {
    const tokenId = user.tokenId;
    const {
      data: { data },
    } = await network.post("/googleAuth/login", { tokenId });
    setFormInput({
      ...formInput,
      fullName: data.fullName,
      email: data.email,
      imgUrl: data.imgUrl,
    });
    dispatch(setIsLogged({ isLogged: true }));
    Cookies.set("token", data.accessToken, { secure: true });
    Cookies.set("id", data.id, { secure: true }); //add id
    delete data.accessToken;
    dispatch(setUser({ user: data }));
    history.push("/");
  };
  return (
    <div className="SignUp-container">
      <form className="SignUp-form">
        <h3>Register</h3>
        <p>
          Finally you can fulfill your dream and live in your own awesome
          apartment and meet great new friends! <br />
          What are you looing for? a short term contract? to enjoy the beach
          just during the summer? <br />
          Find it all in Hommies!
        </p>
        <div className="SignUp-div-input">
          <label>
            <i className="fas fa-user-circle"></i>
          </label>
          <input
            className="SignUp-input"
            type="text"
            value={formInput.fullName}
            onChange={changeHandler}
            name="fullName"
            placeholder="Full Name"
          />
        </div>
        <div className="SignUp-div-input">
          <label>
            <i className="fas fa-envelope"></i>
          </label>
          <input
            className="SignUp-input"
            type="text"
            value={formInput.email}
            onChange={changeHandler}
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="SignUp-div-input">
          <label>
            <i className="fas fa-lock"></i>
          </label>
          <input
            className="SignUp-input"
            type="password"
            value={formInput.password}
            onChange={changeHandler}
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="SignUp-div-input">
          <label>
            <i className="fas fa-phone"></i>
          </label>
          <input
            className="SignUp-input"
            type="text"
            value={formInput.phoneNumber}
            onChange={changeHandler}
            name="phoneNumber"
            placeholder="Phone Number"
          />
        </div>
        <div className="SignUp-div-input">
          <label>
            <i className="fas fa-baby"></i>
          </label>
          <input
            className="SignUp-input"
            type="text"
            value={formInput.age}
            onChange={changeHandler}
            name="age"
            placeholder="Age"
          />
        </div>
        {emptyFldMsg && (
          <span className="SignUp-msg">
            Please fill all the fields correctly :)
          </span>
        )}
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={registerUser}
        >
          Register
        </button>
        {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
        <GoogleLogin
          clientId="267865272692-6ldesrm625v8k8pk9duiteh95op8tso3.apps.googleusercontent.com"
          buttonText="Sign Up"
          onSuccess={handleGoogle}
          onFailure={handleGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <button>Sign With Facebook</button>
      </form>
      <div>
        <img
          className="SignUp-img"
          alt="welcome"
          src="./images/signUpImg.jpeg"
        />
      </div>
    </div>
  );
}

export default SignUp;
