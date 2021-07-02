import React, { useState } from "react";
import "./signIn.css";
import network from "../../utils/network";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLogged } from "../../store/authSlice";
import { setUser } from "../../store/userSlice";
import FormValidation from "../../utils/formValidation";
import Cookies from "js-cookie";
import { ISignIn } from "../../interfaces/interface";
import GoogleLogin from "react-google-login";

function SignIn() {
  const [emptyFldMsg, setEmptyFldMsg] = useState(false);
  const [formInput, setFormInput] = useState<ISignIn>({
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
        const {
          data: { data },
        } = await network.post("/login/sign-in", formInput);
        dispatch(setIsLogged({ isLogged: true }));
        Cookies.set("token", data.accessToken, { expires: 1, secure: true });
        Cookies.set("id", data.id, { expires: 1, secure: true });
        delete data.accessToken;

        dispatch(setUser({ user: data }));
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
    dispatch(setIsLogged({ isLogged: true }));
    Cookies.set("token", data.accessToken, { secure: true });
    Cookies.set("id", data.id, { secure: true });
    delete data.accessToken;
    dispatch(setUser({ user: data }));
    history.push("/");
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
        <span className="SignIn-no-account-span">
          don't have an account? <Link to="/sign-up">Click Here</Link>
        </span>
        {emptyFldMsg && (
          <span className="SignUp-msg">Email or password are incorrect :)</span>
        )}
        <div>
          <button type="submit" className="btn btn-outline-primary">
            Sign In
          </button>
          <GoogleLogin
            clientId={
              process.env.REACT_APP_CLIENT_ID
                ? process.env.REACT_APP_CLIENT_ID
                : ""
            }
            buttonText="Sign In With Google"
            onSuccess={handleGoogle}
            onFailure={handleGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
      <div>
        <img className="SignUp-img" alt="welcome" src="./images/signIn.jpg" />
      </div>
    </div>
  );
}

export default SignIn;
