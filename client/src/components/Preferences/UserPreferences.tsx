import "./userPreferences.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setPreferences,
  prefSelectors,
  PrefState,
} from "../../store/prefSlice";
import { useEffect } from "react";

function UserPreferences() {
  const dispatch = useDispatch();
  const { preferences }: PrefState = useSelector(prefSelectors);

  const changeHandler = (e: any) => {
    dispatch(
      setPreferences({
        preferences: { ...preferences, [e.target.id]: e.target.value },
      })
    );
  };
  useEffect(() => {
    const spans = document.querySelectorAll(".UserPreferences-more-opt-span");
    spans.forEach((span) => {
      let id = span.id.toString();
      const entries = Object.entries(preferences);
      for (const entry of entries) {
        if (entry[0] === id && entry[1] === true) {
          span.classList.add("selected");
        }
      }
    });
  }, []);

  const booleanChangeHandler = (e: any) => {
    if (e.target.id) {
      dispatch(
        setPreferences({
          preferences: {
            ...preferences,
            [e.target.id]: e.target.classList[1] ? false : true,
          },
        })
      );
      e.target.classList.toggle("selected");
    }
  };

  return (
    <div className="UserPreferences-container">
      <div>
        <label>Rental type:</label>
        <select
          id="rentalType"
          onChange={changeHandler}
          value={preferences.rentalType}
        >
          <option value=""></option>
          <option value="short term">short term (1 - 6 months)</option>
          <option value="long term">long term</option>
        </select>
      </div>
      <div className="UserPreferences-input-div">
        <label>Entry date: </label>
        <input
          id="entryDate"
          type="date"
          onChange={changeHandler}
          value={preferences.entryDate}
        />
      </div>
      <div className="UserPreferences-input-div">
        <label>Check out date: </label>
        <input
          id="checkOutDate"
          type="date"
          onChange={changeHandler}
          value={preferences.checkOutDate}
        />
      </div>
      <div className="UserPreferences-more-opt">
        <span>
          <span
            id="parking"
            className="UserPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-parking UserPreferences-i"></i>Parking
          </span>
          <span
            id="porch"
            className="UserPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-store UserPreferences-i"></i>Porch
          </span>
          <span
            id="garden"
            className="UserPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-seedling UserPreferences-i"></i>Garden
          </span>
        </span>
        <span>
          <span
            id="furnished"
            className="UserPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-couch UserPreferences-i"></i>Furnished
          </span>
          <span
            id="elevator"
            className="UserPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="far fa-caret-square-up UserPreferences-i"></i>{" "}
            Elevator
          </span>
          <span
            id="handicapAccessible"
            className="UserPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-wheelchair UserPreferences-i"></i>Accessible
          </span>
        </span>
        <span>
          <span
            id="petsAllowed"
            className="UserPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-paw UserPreferences-i"></i>Pets
          </span>
          <span
            id="smokeAllowed"
            className="UserPreferences-more-opt-span"
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
