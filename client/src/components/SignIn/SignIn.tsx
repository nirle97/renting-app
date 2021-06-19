import React from "react";
import { useHistory } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../interfaces/interface"
import { logIn } from "../../store/authSlice"

function SignIn () {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const hi = () => {
        dispatch(logIn())
        history.push("/")
    }
    return (
    <div>
        <button onClick={hi}>hello</button>
    </div>
    )
}

export default SignIn