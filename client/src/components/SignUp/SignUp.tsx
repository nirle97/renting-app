import React, { useState } from "react";
import "./signUp.css";
import network from "../../utils/network";
import { useHistory } from "react-router-dom";
import { IForm } from "../../interfaces/interface";
import FormValidation from "../../utils/formValidation";

function SignUp() {
  const [emptyFldMsg, setEmptyFldMsg] = useState(false);
  const [formInput, setFormInput] = useState<IForm>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    age: "",
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

  return (
    <div className="SignUp-container">
      <form className="SignUp-form" onSubmit={registerUser}>
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
        <button type="submit" className="btn btn-outline-primary">
          Register
        </button>
        <button>Sign With Google</button>
        <button>Sign With Facebook</button>
      </form>
      <div>
        <img
          className="SignUp-img"
          alt="welcome picture"
          src="./images/signUpImg.jpeg"
        />
      </div>
    </div>
  );
}

export default SignUp;
