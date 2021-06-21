import React, { useState } from "react";
import "./signIn.css";
import network from "../../utils/network";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLogged } from "../../store/authSlice";
import FormValidation from "../../utils/formValidation";

function SignIn() {
  const [emptyFldMsg, setEmptyFldMsg] = useState(false);
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const signInUser = async (e: any) => {
    try {
      e.preventDefault();
      if (
        // FormValidation.isPasswordOk(formInput) &&
        FormValidation.isEmailOk(formInput)
      ) {
        await network.post("/login/sign-in", formInput);
        dispatch(setIsLogged({ isLogged: true }));
        history.push("/");
      } else {
        setEmptyFldMsg(true);
      }
    } catch (e) {
      console.error(e);
      setEmptyFldMsg(true);
    }
  };

  return (
    <div className="SignUp-container">
      <form className="SignUp-form" onSubmit={signInUser}>
        <h3>Sign In</h3>
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
        <span>
          don't have an account? <Link to="/sign-up">Click Here</Link>
        </span>
        {emptyFldMsg && (
          <span className="SignUp-msg">Email or password are incorrect :)</span>
        )}
        <button type="submit" className="btn btn-outline-primary">
          Sign In
        </button>
        <button>Sign With Google</button>
        <button>Sign With Facebook</button>
      </form>
      <div>
        {/* <img className="SignUp-img" alt="welcome picture" src="./images/signUpImg.jpeg"/> */}
      </div>
    </div>
  );
}

export default SignIn;
