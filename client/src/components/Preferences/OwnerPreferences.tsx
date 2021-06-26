import "./ownerPreferences.css";
import { IUploadNewApt } from "../../interfaces/interface";
interface IProps {
  formInput: IUploadNewApt;
  setFormInput: React.Dispatch<React.SetStateAction<IUploadNewApt>>;
}
function OwnerPreferences({ formInput, setFormInput }: IProps) {
  const changeHandler = (e: any) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  const booleanChangeHandler = async (e: any) => {
    if(e.target.id){
      setFormInput({...formInput, [e.target.id]: e.target.classList[1]? false : true})
      e.target.classList.toggle("selected");      

    }
  };

  return (
    <div className="OwnerPreferences-container">
      <div className="OwnerPreferences-div-input">
        <label>Rental type:</label>
        <select
          className="OwnerPreferences-input"
          id="rentalType"
          onChange={changeHandler}
          value={formInput.rentalType}
        >
          <option value="short term">short term (1 - 6 months)</option>
          <option value="long term">long term</option>
        </select>
      </div>
      <div className="OwnerPreferences-div-input">
        <label>Entry date:</label>
        <input
          className="OwnerPreferences-input"
          id="entryDate"
          type="date"
          onChange={changeHandler}
          value={formInput.entryDate}
        />
      </div>
      <div className="OwnerPreferences-div-input">
        <label>Check out date:</label>
        <input
          className="OwnerPreferences-input"
          id="checkOutDate"
          type="date"
          onChange={changeHandler}
          value={formInput.checkOutDate}
        />
      </div>
      <div className="OwnerPreferences-more-opt">
        <span>
          <span
            id="parking"
            className="OwnerPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-parking OwnerPreferences-i"></i>Parking
          </span>
          <span
            id="porch"
            className="OwnerPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-store OwnerPreferences-i"></i>Porch
          </span>
          <span
            id="garden"
            className="OwnerPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-seedling OwnerPreferences-i"></i>Garden
          </span>
        </span>
        <span>
          <span
            id="furnished"
            className="OwnerPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-couch OwnerPreferences-i"></i>Furnished
          </span>
          <span
            id="elevator"
            className="OwnerPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="far fa-caret-square-up OwnerPreferences-i"></i>{" "}
            Elevator
          </span>
          <span
            id="handicapAccessible"
            className="OwnerPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-wheelchair OwnerPreferences-i"></i> Accessible
          </span>
        </span>
        <span>
          <span
            id="petsAllowed"
            className="OwnerPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-paw OwnerPreferences-i"></i> Pets
          </span>
          <span
            id="smokeAllowed"
            className="OwnerPreferences-more-opt-span"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-smoking OwnerPreferences-i"></i>smoke
          </span>
        </span>
      </div>
    </div>
  );
}
export default OwnerPreferences;
