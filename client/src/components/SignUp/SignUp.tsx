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
import axios from "axios";
require("dotenv").config();

function SignUp() {
  const dispatch = useDispatch();
  const [emptyFldMsg, setEmptyFldMsg] = useState(false);
  const [file, setFile] = useState<string | Blob>("");
  const [image, setImages] = useState("");
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
    if (e.target.name === "imgUrl" && e.target.files) {
      setFile(e.target.files[0]);
    }
    setFormInput({
      ...formInput,
      [e.target.name]:
        e.target.name === "age" ? Number(e.target.value) : e.target.value,
    });
  };

  async function postImage(
    image: string | Blob,
    description: string
  ): Promise<void> {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    const result = await axios.post("/login/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImages(result.data.data);
    return result.data.data;
  }

  const registerUser = async (e: any) => {
    try {
      e.preventDefault();
      if (FormValidation.isFormValid(formInput)) {
        const url = await postImage(file, "profileImg");
        setFormInput({ ...formInput, imgUrl: image });
        await network.post("/login/sign-up", { ...formInput, imgUrl: url });
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
    console.log(data);
    dispatch(setIsLogged({ isLogged: true }));
    Cookies.set("token", data.accessToken, { secure: true });
    Cookies.set("id", data.id, { secure: true });
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
          <label>
            <i className="fas fa-camera"></i>
          </label>
          <input
            className="SignUp-input"
            id="upload-pic"
            type="file"
            accept=".jpg,.jpeg,.png,.PNG"
            onChange={changeHandler}
            name="imgUrl"
          />
        </div>
        {emptyFldMsg && (
          <span className="SignUp-msg">
            Please fill all the fields correctly :)
          </span>
        )}
        <div>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={registerUser}
          >
            Register
          </button>
          <GoogleLogin
            clientId={
              process.env.REACT_APP_CLIENT_ID
                ? process.env.REACT_APP_CLIENT_ID
                : ""
            }
            buttonText="Sign Up With Google"
            onSuccess={handleGoogle}
            onFailure={handleGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
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
