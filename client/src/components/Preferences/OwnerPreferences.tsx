import "./ownerPreferences.css";
import { IUploadNewApt } from "../../interfaces/interface"
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    value?: boolean;
  }
}
interface IProps {
    formInput: IUploadNewApt
    setFormInput: React.Dispatch<React.SetStateAction<IUploadNewApt>>
  }
function OwnerPreferences({ formInput, setFormInput }: IProps) {
  const changeHandler = (e: any) => {
    setFormInput({...formInput, [e.target.id]: e.target.value})
  };

  const booleanChangeHandler = (e: any) => {
    setFormInput({...formInput, [e.target.id]: !e.target.value})
    e.target.classList.toggle("selected");
  };

  return (
    <div className="OwnerPreferences-container">
      <div>
        <select id="rentalType" onChange={changeHandler} value={formInput.rentalType}>
          <option value="short term">short term (1 - 6 months)</option>
          <option value="long term">long term</option>
        </select>
      </div>
      <div>
        <label>Entry date:</label>
        <input id="entryDate" type="date" onChange={changeHandler} value={formInput.entryDate} />
        <label>Check out date:</label>
        <input id="checkOutDate" type="date" onChange={changeHandler} value={formInput.entryDate} />
      </div>
      <div className="OwnerPreferences-more-opt">
        <span>
          <span
            id="parking"
            className="OwnerPreferences-more-opt-span"
            value={formInput.parking}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-parking"></i>Parking
          </span>
          <span
            id="porch"
            className="OwnerPreferences-more-opt-span"
            value={formInput.porch}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-store"></i>Porch
          </span>
          <span
            id="garden"
            className="OwnerPreferences-more-opt-span"
            value={formInput.garden}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-seedling"></i>Garden
          </span>
        </span>
        <span>
          <span
            id="furnished"
            className="OwnerPreferences-more-opt-span"
            value={formInput.furnished}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-sofa"></i>Furnished
          </span>
          <span
            id="elevator"
            className="OwnerPreferences-more-opt-span"
            value={formInput.elevator}
            onClick={booleanChangeHandler}
          >
            <i className="far fa-caret-square-up"></i> Elevator
          </span>
          <span
            id="handicapAccessible"
            className="OwnerPreferences-more-opt-span"
            value={formInput.handicapAccessible}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-wheelchair">Handicap Accessible</i>
          </span>
        </span>
        <span>
          <span
            id="petsAllowed"
            className="OwnerPreferences-more-opt-span"
            value={formInput.petsAllowed}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-paw">Pets</i>
          </span>
          <span
            id="smokeAllowed"
            className="OwnerPreferences-more-opt-span"
            value={formInput.smokeAllowed}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-smoking"></i>smoke
          </span>
        </span>
      </div>
    </div>
  );
}
export default OwnerPreferences;
;
