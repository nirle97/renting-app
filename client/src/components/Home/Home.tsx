import { useState, useRef } from "react";
import "./home.css";
import network from "../../utils/network";
import Filter from "../Filter/Filter";
import Apartment from "../Apartment/Apartment";
import { useEffect } from "react";
import { profileSelectors } from "../../store/profileSlice";
import { setPreferences } from "../../store/prefSlice";
import { setIsDataLoading } from "../../store/spinnerSlice";
import { setAptsArray, AptState } from "../../store/aptSlice";
import { useDispatch, useSelector } from "react-redux";
import { aptSelectors } from "../../store/aptSlice";
import Map from "../Map/Map";

function Home() {

  const { userApts }: AptState = useSelector(aptSelectors);
  const [aptToDisplay, setAptToDisplay] = useState<number>(0);
  // const [showMap, setShowMap] = useState<boolean>(false);
  const { isprofileClicked } = useSelector(profileSelectors);
  const toggleFilterBtn = useRef<HTMLDivElement>(null);
  const [openFiltersBar, setOpenFiltersBar] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPref();
    toggleFilters();
  }, []);
  
  const getUserPref = async () => {
    dispatch(setIsDataLoading({isDataLoading: true}))
    const {
      data: { data },
    } = await network.get("/preference/user-preferences");
    if (data) {
      dispatch(setPreferences({ preferences: data.preferences }));
    }
    dispatch(setIsDataLoading({isDataLoading: false}))
  };

  const aptPreference = async (preference: string) => {
    dispatch(setIsDataLoading({isDataLoading: true}))
    await network.put(
      `apartment/like-status/${userApts[aptToDisplay]._id}?status=${preference}`
    );
    dispatch(setIsDataLoading({isDataLoading: false}))
    const updatedUserApts = userApts.slice(aptToDisplay, aptToDisplay);
    dispatch(setAptsArray({ userApts: updatedUserApts }));
    setAptToDisplay(aptToDisplay + 1);
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
          <Filter toggleFilters={toggleFilters}/>
        </div>
      </div>
      {userApts && aptToDisplay < userApts.length ? (
        <div className="Home-main">
          <div className="Home-apartment-component">
            <Apartment
              aptPreference={aptPreference}
              apt={userApts[aptToDisplay]}
            />
          </div>
          <div className="Home-apartment-map">
            <Map
              cords={
                userApts[aptToDisplay].cords
                  ? userApts[aptToDisplay].cords
                  : {
                      lat: 32.1149489,
                      lng: 34.8271349,
                    }
              }
            />
          </div>
          {/* <span className="Home-map-button-span" onClick={scrollToMap}>
            <i className="fas fa-long-arrow-alt-down"></i>
            Scroll down for GoogleMap
            <i className="fas fa-long-arrow-alt-down"></i>
          </span>
          {showMap && ( */}
          {/* // )} */}
        </div>
      ) : (
        <div className="Home-noNew-div">
          <h2>Can't Find New Apartaments For You</h2>
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
