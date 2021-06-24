import { useState, useRef, useEffect } from "react";
import "./filter.css";
import Range from "./Range";
import { IFilter } from "../../interfaces/interface";
import SearchBar from "../SearchBar/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, prefSelectors } from "../../store/prefSlice";
import network from "../../utils/network";
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    value?: boolean;
  }
}
interface IProps {
  setCurrentFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  currentFilter: IFilter;
}

function Filter({ currentFilter, setCurrentFilter }: IProps) {
  const dispatch = useDispatch();
  const { preferences } = useSelector(prefSelectors);
  const [searchValue, setSearchValue] = useState({
    cords: { lat: 0, lng: 0 },
    address: "",
  });

  const changeHandler = (e: any) => {
    console.log(currentFilter);

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

  const savePreferences = async () => {
    await network.put("/preference/user-preferences", currentFilter);
  };

  useEffect(() => {
    setCurrentFilter({ ...currentFilter, address: searchValue.address });
  }, [searchValue]);

  return (
    <div className="Filter-container">
      <div className="Filter-address">
        Address:{" "}
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />{" "}
      </div>
      <div className="Filter-range-container">
        <span className="Filter-range-name"> price range: </span>
        <Range
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          max={1000}
          step={100}
          type="price"
        />
        <span className="Filter-range-min-span">{currentFilter.priceMin}</span>
        <span className="Filter-range-max-span">{currentFilter.priceMax}</span>
      </div>
      <div className="Filter-range-container">
        <span className="Filter-range-name"> size(m²): </span>
        <Range
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          max={300}
          step={5}
          type="size"
        />
        <span className="Filter-range-min-span">{currentFilter.sizeMin}</span>
        <span className="Filter-range-max-span">{currentFilter.sizeMax}</span>
      </div>
      <div className="Filter-range-container">
        <span className="Filter-range-name"> rooms: </span>
        <Range
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          max={10}
          step={1}
          type="rooms"
        />
        <span className="Filter-range-min-span">{currentFilter.roomsMin}</span>
        <span className="Filter-range-max-span">{currentFilter.roomsMax}</span>
      </div>
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
      <button onClick={savePreferences}>confirm</button>
    </div>
  );
}
export default Filter;
