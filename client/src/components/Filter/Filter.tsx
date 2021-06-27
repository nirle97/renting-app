import { useState, useEffect } from "react";
import "./filter.css";
import { IApt } from "../../interfaces/interface";
import Range from "./Range";
import SearchBar from "../SearchBar/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, prefSelectors } from "../../store/prefSlice";
import network from "../../utils/network";
import UserPreferences from "../Preferences/UserPreferences";
interface IProps {
  setAptArr: any;
}
function Filter({ setAptArr }: IProps) {
  const dispatch = useDispatch();
  const { preferences } = useSelector(prefSelectors);
  const [searchValue, setSearchValue] = useState({
    cords: { lat: 0, lng: 0 },
    address: "",
  });

  const savePreferences = async () => {
    await network.put("/preference/user-preferences", preferences);
    const {
      data: { data },
    } = await network.post("/apartment/filtered-apts", preferences);
    setAptArr(data);
    console.log(preferences);
  };

  useEffect(() => {
    dispatch(
      setPreferences({
        preferences: { ...preferences, address: searchValue.address },
      })
    );
  }, [searchValue]);

  useEffect(() => {
    setSearchValue({ ...searchValue, address: preferences.address });
  }, []);

  return (
    <div className="Filter-container">
      <div className="Filter-address">
        Address:{" "}
        <SearchBar
          searchValue={{ ...searchValue, address: preferences.address }}
          setSearchValue={setSearchValue}
          searchBarClass="Filter-search"
        />{" "}
      </div>
      <div className="Filter-range-container">
        <span className="Filter-range-name"> price range: </span>
        <Range max={10000} step={100} type="price" />
        <span className="Filter-range-min-span">{preferences.priceMin}</span>
        <span className="Filter-range-max-span">{preferences.priceMax}</span>
      </div>
      <div className="Filter-range-container">
        <span className="Filter-range-name"> size(m²): </span>
        <span className="Filter-range-span">
          <Range max={300} step={5} type="size" />
        </span>
        <span className="Filter-range-min-span">{preferences.sizeMin}</span>
        <span className="Filter-range-max-span">{preferences.sizeMax}</span>
      </div>
      <div className="Filter-range-container">
        <span className="Filter-range-name"> rooms: </span>
        <Range max={10} step={1} type="rooms" />
        <span className="Filter-range-min-span">{preferences.roomsMin}</span>
        <span className="Filter-range-max-span">{preferences.roomsMax}</span>
      </div>
      <div>
        <UserPreferences />
      </div>
      <button onClick={savePreferences}>confirm</button>
    </div>
  );
}
export default Filter;
