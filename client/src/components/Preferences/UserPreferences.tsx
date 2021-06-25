import "./userPreferences.css";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, prefSelectors, PrefState } from "../../store/prefSlice";
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    value?: boolean;
  }
}

function UserPreferences() {
  const dispatch = useDispatch();
  const { preferences }: PrefState = useSelector(prefSelectors);

  const changeHandler = (e: any) => {
      dispatch(setPreferences({preferences: {...preferences, [e.target.id]: e.target.value}}))
  };

  const booleanChangeHandler = (e: any) => {
    if(e.target.id){
      dispatch(setPreferences({preferences: {...preferences, [e.target.id]: !e.target.value}}))
    }
  };
  const selectedClassName = ["UserPreferences-more-opt-span", "UserPreferences-more-opt-span selected"]
  
  return (
    <div className="UserPreferences-container">
        <div>
          <select id="rentalType" onChange={changeHandler} value={preferences.rentalType}>
            <option value="short term">short term (1 - 6 months)</option>
            <option value="long term">long term</option>
          </select>
        </div>
        <div className="UserPreferences-input-div">
          <label>Entry date: </label>
          <input id="entryDate" type="date" onChange={changeHandler} value={preferences.entryDate} />
        </div>
        <div className="UserPreferences-input-div">
          <label>Check out date: </label>
          <input id="checkOutDate" type="date" onChange={changeHandler} value={preferences.checkOutDate} />
        </div>
      <div className="UserPreferences-more-opt">
        <span>
          <span
            id="parking"
            className={preferences.parking ? selectedClassName[1] : selectedClassName[0]}
            value={preferences.parking}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-parking UserPreferences-i"></i>Parking
          </span>
          <span
            id="porch"
            className={preferences.porch ? selectedClassName[1] : selectedClassName[0]}
            value={preferences.porch}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-store UserPreferences-i"></i>Porch
          </span>
          <span
            id="garden"
            className={preferences.garden ? selectedClassName[1] : selectedClassName[0]}
            value={preferences.garden}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-seedling UserPreferences-i"></i>Garden
          </span>
        </span>
        <span>
          <span
            id="furnished"
            className={preferences.furnished ? selectedClassName[1] : selectedClassName[0]}
            value={preferences.furnished}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-couch UserPreferences-i"></i>Furnished
          </span>
          <span
            id="elevator"
            className={preferences.elevator ? selectedClassName[1] : selectedClassName[0]}
            value={preferences.elevator}
            onClick={booleanChangeHandler}
          >
            <i className="far fa-caret-square-up UserPreferences-i"></i> Elevator
          </span>
          <span
            id="handicapAccessible"
            className={preferences.handicapAccessible ? selectedClassName[1] : selectedClassName[0]}
            value={preferences.handicapAccessible}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-wheelchair UserPreferences-i"></i>Accessible
          </span>
        </span>
        <span>
          <span
            id="petsAllowed"
            className={preferences.petsAllowed ? selectedClassName[1] : selectedClassName[0]}
            value={preferences.petsAllowed}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-paw UserPreferences-i"></i>Pets
          </span>
          <span
            id="smokeAllowed"
            className={preferences.smokeAllowed ? selectedClassName[1] : selectedClassName[0]}
            value={preferences.smokeAllowed}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-smoking UserPreferences-i"></i>smoke
          </span>
        </span>
      </div>
    </div>
  );
}
export default UserPreferences;
