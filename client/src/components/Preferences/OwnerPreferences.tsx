import "./ownerPreferences.css";
import { IUploadNewApt } from "../../interfaces/interface";

interface IProps {
  formInput: IUploadNewApt;
  setFormInput: React.Dispatch<React.SetStateAction<IUploadNewApt>>;
}
function OwnerPreferences({ formInput, setFormInput }: IProps) {

  const booleanChangeHandler = async (e: any) => {
    if (e.target.id) {
      setFormInput({
        ...formInput,
        [e.target.id]: e.target.classList[1] ? false : true,
      });
      e.target.classList.toggle("selected");
    }
  };

  return (
    <div className="OwnerPreferences-container">
        <div className="OwnerPreference-row">
          <div
            id="parking"
            className="OwnerPreferences-more-opt-div"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-parking OwnerPreferences-i"></i>Parking
          </div>
          <div
            id="porch"
            className="OwnerPreferences-more-opt-div"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-store OwnerPreferences-i"></i>Porch
          </div>
          <div
            id="garden"
            className="OwnerPreferences-more-opt-div"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-seedling OwnerPreferences-i"></i>Garden
          </div>
          <div
            id="furnished"
            className="OwnerPreferences-more-opt-div"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-couch OwnerPreferences-i"></i>Furnished
          </div>
        </div>
        <div className="OwnerPreference-row">
          <div
            id="elevator"
            className="OwnerPreferences-more-opt-div"
            onClick={booleanChangeHandler}
          >
            <i className="far fa-caret-square-up OwnerPreferences-i"></i>{" "}
            Elevator
          </div>
          <div
            id="handicapAccessible"
            className="OwnerPreferences-more-opt-div"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-wheelchair OwnerPreferences-i"></i> Accessible
          </div>
          <div
            id="petsAllowed"
            className="OwnerPreferences-more-opt-div"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-paw OwnerPreferences-i"></i> Pets
          </div>
          <div
            id="smokeAllowed"
            className="OwnerPreferences-more-opt-div"
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-smoking OwnerPreferences-i"></i>smoke
          </div>
        </div>
      </div>
  );
}
export default OwnerPreferences;
