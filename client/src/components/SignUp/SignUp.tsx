import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../interfaces/interface"
import {Form, Button} from "react-bootstrap"
function SignUp () {
    const [fieldActive, setFieldActive] = useState(false)
    const [inputVlaue, setInputVlaue] = useState("")
    const history = useHistory()
    const dispatch = useAppDispatch()
    const activateField = () => {
        setFieldActive(false)
       }
      // to deactivate input only if it's empty
       const disableFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setFieldActive(false)
        }
       }
      // to update the changes in the input and activate it
      const updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVlaue(e.target.value)
        setFieldActive(false);
        e.preventDefault();
       }
    return (
        <div>
            <form>
            <div className="field-group">
                <label
                    // check state the input, whether it is active then apply the class for floating label
                    className={fieldActive ? "field-active" : ""}
                >
                Name
                </label>
                <input
                    className="floating-label"
                    type="text"
                    value={inputVlaue}
                    onFocus={activateField}
                    // onBlur={disableField}
                    onChange={updateInputValue}
                />
            </div>
            </form>
        </div>
    )
}

export default SignUp