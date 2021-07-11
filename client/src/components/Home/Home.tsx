import { useState, useRef } from "react";
import "./home.css";
import network from "../../utils/network";
import Filter from "../Filter/Filter";
import Apartment from "../Apartment/Apartment";
import { useEffect } from "react";
import { profileSelectors } from "../../store/profileSlice";
import { setPreferences, prefSelectors } from "../../store/prefSlice";
import { setIsDataLoading } from "../../store/spinnerSlice";
import { setAptsArray, AptState } from "../../store/aptSlice";
import { useDispatch, useSelector } from "react-redux";
import { aptSelectors } from "../../store/aptSlice";
import Map from "../Map/Map";

function Home() {
  const { userApts }: AptState = useSelector(aptSelectors);
  const { isprofileClicked } = useSelector(profileSelectors);
  const { preferences } = useSelector(prefSelectors);
  const toggleFilterBtn = useRef<HTMLDivElement>(null);
  const [openFiltersBar, setOpenFiltersBar] = useState(true);
  const dispatch = useDispatch();
  const homeRefDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    getUserPref();
    if (userApts.length > 0) {
      toggleFilters();
    }
  }, []);

  useEffect(() => {
    if (userApts.length === 2) {
      getMoreApts();
    }
  }, [userApts]);

  const getMoreApts = async () => {
    try {
      dispatch(setIsDataLoading({ isDataLoading: true }));
      const {
        data: { data },
      } = await network.post(
        `${process.env.REACT_APP_BASE_URL}/apartment/filtered-apts`,
        preferences
      );
      if (data.length !== 0) {
        dispatch(setIsDataLoading({ isDataLoading: false }));
        dispatch(setAptsArray({ userApts: [...userApts, ...data] }));
      } else {
        dispatch(setIsDataLoading({ isDataLoading: false }));
      }
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  };
  const getUserPref = async () => {
    try {
      dispatch(setIsDataLoading({ isDataLoading: true }));
      const {
        data: { data },
      } = await network.get(
        `${process.env.REACT_APP_BASE_URL}/preference/user-preferences`
      );
      if (data) {
        dispatch(setPreferences({ preferences: data.preferences }));
      }
      dispatch(setIsDataLoading({ isDataLoading: false }));
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  };

  const aptPreference = async (preference: string) => {
    try {
      dispatch(setIsDataLoading({ isDataLoading: true }));
      homeRefDiv.current?.classList.add(
        preference === "likedBy" ? "like-right" : "dislike-left"
      );
      await network.put(
        `${process.env.REACT_APP_BASE_URL}/apartment/like-status/${userApts[0]._id}?status=${preference}`
      );
      setTimeout(() => {
        homeRefDiv.current?.classList.remove(
          preference === "likedBy" ? "like-right" : "dislike-left"  );

      }, 1000);
        const updatedUserApts = userApts.slice(1);
        console.log(updatedUserApts);
        
        dispatch(setAptsArray({ userApts: updatedUserApts }));
        dispatch(setIsDataLoading({ isDataLoading: false }));
    } catch (e) {
      dispatch(setIsDataLoading({ isDataLoading: false }));
    }
  };

  const toggleFilters = () => {
    if (toggleFilterBtn.current) {
      const filtersDiv = toggleFilterBtn.current.lastChild as HTMLElement;
      setOpenFiltersBar((prev) => !prev);
      if (openFiltersBar) {
        filtersDiv.classList.toggle("close-filters");
      } else {
        filtersDiv.classList.toggle("open-filters");
      }
    }
  };

  return (
    <div className={`${isprofileClicked && "z-index"} Home-container`}>
      <div className="Home-filter-component">
        <span className="Home-filter-btn" onClick={toggleFilters}>
          <i className="fas fa-bars"></i>
        </span>
        <div ref={toggleFilterBtn} className="Home-filter-toggle-div">
          <Filter toggleFilters={toggleFilters} />
        </div>
      </div>
      {userApts && 0 < userApts.length ? (
        <div className="Home-main" ref={homeRefDiv}>
          <div className="Home-apartment-component">
            <Apartment aptPreference={aptPreference} apt={userApts[0]} />
          </div>
          <div className="Home-apartment-map">
            <Map cords={userApts[0].cords} isUpload={false} />
          </div>
        </div>
      ) : (
        <div className="Home-noNew-div">
          <h1>Please expand the filter search range </h1>
          <img
            className="Home-noNew-img"
            alt="no new houses to display"
            src="/images/noNewHouses.jpg"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
