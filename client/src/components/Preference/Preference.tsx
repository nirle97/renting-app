import "./filter.css";
import { IFilter } from "../../interfaces/interface";
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    value?: boolean;
  }
}
interface IProps {
  setCurrentFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  currentFilter: IFilter;
}

function Preference({ currentFilter, setCurrentFilter }: IProps) {
  
    const changeHandler = (e: any) => {
    setCurrentFilter({
      ...currentFilter,
      [e.target.id]: e.target.value,
    });
  };

  const booleanChangeHandler = (e: any) => {
    setCurrentFilter({
      ...currentFilter,
      [e.target.id]: !e.target.value,
    });
    e.target.value = !e.target.value;
    e.target.classList.toggle("selected");
  };

  return (
    <div className="Filter-container">
      <div>
        <select id="rentalType" onChange={changeHandler}>
          <option value="short term">short term (1 - 6 months)</option>
          <option value="long term">long term</option>
        </select>
      </div>
      <div>
        <label>Entry date:</label>
        <input id="entryDate" type="Date" onChange={changeHandler} />
        <label>Check out date:</label>
        <input id="checkOutDate" type="Date" onChange={changeHandler} />
      </div>
      <div className="Filter-more-opt">
        <span>
          <span
            id="parking"
            className="Filter-more-opt-span"
            value={false}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-parking"></i>Parking
          </span>
          <span
            id="porch"
            className="Filter-more-opt-span"
            value={false}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-store"></i>Porch
          </span>
          <span
            id="garden"
            className="Filter-more-opt-span"
            value={false}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-seedling"></i>Garden
          </span>
        </span>
        <span>
          <span
            id="furnished"
            className="Filter-more-opt-span"
            value={false}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-sofa"></i>Furnished
          </span>
          <span
            id="elevator"
            className="Filter-more-opt-span"
            value={false}
            onClick={booleanChangeHandler}
          >
            <i className="far fa-caret-square-up"></i> Elevator
          </span>
          <span
            id="handicapAccessible"
            className="Filter-more-opt-span"
            value={false}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-wheelchair">Handicap Accessible</i>
          </span>
        </span>
        <span>
          <span
            id="petsAllowed"
            className="Filter-more-opt-span"
            value={false}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-paw">Pets</i>
          </span>
          <span
            id="smokeAllowed"
            className="Filter-more-opt-span"
            value={false}
            onClick={booleanChangeHandler}
          >
            <i className="fas fa-smoking"></i>smoke
          </span>
        </span>
      </div>
    </div>
  );
}
export default Preference;
