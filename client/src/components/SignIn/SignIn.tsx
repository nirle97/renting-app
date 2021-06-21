import React, {useState} from "react";
import "./signIn.css"
import network from "../../utils/network"
import { useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { IForm } from "../../interfaces/interface"
import { setIsLogged } from "../../store/authSlice"
import Cookies from "js-cookie";

function SignUp () {
    const [inputVlaue, setInputVlaue] = useState("")
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
      });
    const history = useHistory()
    const dispatch = useDispatch()

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormInput({
          ...formInput,
          [e.target.name]: e.target.value,
        });
      };

      const signInUser = async (e: any) => {
        try {
            e.preventDefault()
            const res = await network.post("/login/sign-in", formInput)
            dispatch(setIsLogged({isLogged: true}))
             Cookies.set("token",res.data.data.accessToken) 
            history.push("/")
        } catch(e) {
            console.error(e)
        }
      }

    return (
        <div className="SignUp-container">
            <form className="SignUp-form" onSubmit={signInUser}>
                <h3>Sign In</h3>
                <div className="SignUp-div-input">
                <label><i className="fas fa-envelope"></i></label>
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
                    <label><i className="fas fa-lock"></i></label>
                    <input
                        className="SignUp-input"
                        type="password"
                        value={formInput.password}
                        onChange={changeHandler}
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <span>don't have an account? <Link to="/sign-up">Click Here</Link></span>
                <button type="submit" className="btn btn-outline-primary">Sign In</button>
                <button>Sign With Google</button>
                <button>Sign With Facebook</button>
            </form>
            <div>
                {/* <img className="SignUp-img" alt="welcome picture" src="./images/signUpImg.jpeg"/> */}
            </div>
        </div>
    )
}

export default SignUp