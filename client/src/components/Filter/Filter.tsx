import { useState, useEffect } from "react";
import "./filter.css";
import Range from "./Range";
import SearchBar from "../SearchBar/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, prefSelectors } from "../../store/prefSlice";
import { setAptsArray } from "../../store/aptSlice";
import network from "../../utils/network";
import UserPreferences from "../Preferences/UserPreferences";
import { setIsDataLoading } from "../../store/spinnerSlice";

function Filter({ toggleFilters }: { toggleFilters: () => void }) {
  const dispatch = useDispatch();
  const { preferences } = useSelector(prefSelectors);
  const [searchValue, setSearchValue] = useState({
    cords: { lat: 0, lng: 0 },
    address: "",
  });

  const savePreferences = async () => {
    try {
      dispatch(setIsDataLoading({ isDataLoading: true }));
      await network.put(
        `${process.env.REACT_APP_BASE_URL}/preference/user-preferences`,
        preferences
      );
      const {
        data: { data },
      } = await network.post(
        `${process.env.REACT_APP_BASE_URL}/apartment/filtered-apts`,
        preferences
      );
      dispatch(setIsDataLoading({ isDataLoading: false }));
      dispatch(setAptsArray({ userApts: data }));
      toggleFilters();
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
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
      <h1 className="Filter-header">
        Filters
        <i className="fas fa-filter"></i>
      </h1>
      <div className="Filter-filters">
        <div className="Filter-address">
          Address:
          <SearchBar
            searchValue={{ ...searchValue, address: preferences.address }}
            setSearchValue={setSearchValue}
            searchBarClass="Filter-search"
          />
        </div>
        <div className="Filter-range-container">
          <span id="price-range-name" className="Filter-range-name">
            price range:
          </span>
          <span className="Filter-range-component">
            <Range max={10000} step={100} type="price" />
          </span>
          <span className="Filter-range-min-span">{preferences.priceMin}</span>
          <span className="Filter-range-max-span">
            {preferences.priceMax}
            {preferences.priceMax === 10000 && "+"}
          </span>
        </div>
        <div className="Filter-range-container">
          <span className="Filter-range-name"> size(m²): </span>
          <span className="Filter-range-span">
            <Range max={300} step={5} type="size" />
          </span>
          <span className="Filter-range-min-span">{preferences.sizeMin}</span>
          <span className="Filter-range-max-span">
            {preferences.sizeMax}
            {preferences.sizeMax === 300 && "+"}
          </span>
        </div>
        <div className="Filter-range-container">
          <span className="Filter-range-name"> rooms: </span>
          <Range max={10} step={1} type="rooms" />
          <span className="Filter-range-min-span">{preferences.roomsMin}</span>
          <span className="Filter-range-max-span">
            {preferences.roomsMax}
            {preferences.roomsMax === 10 && "+"}
          </span>
        </div>
        <div>
          <UserPreferences />
        </div>
      </div>
      <button
        type="button"
        id="Filter-searchApt-btn"
        className="btn btn-outline-success"
        onClick={savePreferences}
      >
        Seach!
      </button>
    </div>
  );
}
export default Filter;
