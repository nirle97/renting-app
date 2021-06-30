import { useState, useRef } from "react";
import "./home.css";
import network from "../../utils/network";
import Filter from "../Filter/Filter";
import Apartment from "../Apartment/Apartment";
import { useEffect } from "react";
import { profileSelectors } from "../../store/profileSlice";
import { setPreferences } from "../../store/prefSlice";
import { useDispatch, useSelector } from "react-redux";
import { aptSelectors } from "../../store/aptSlice";
import Map from "../Map/Map";

function Home() {
  const { userApts } = useSelector(aptSelectors);
  const [aptToDisplay, setAptToDisplay] = useState<number>(0);
  const [showMap, setShowMap] = useState<boolean>(false);
  const { isprofileClicked } = useSelector(profileSelectors);
  const toggleFilterBtn = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPref();
  }, []);

  const getUserPref = async () => {
    const {
      data: { data },
    } = await network.get("/preference/user-preferences");
    if (data) {
      dispatch(setPreferences({ preferences: data.preferences }));
    }
  };

  const aptPreference = async (preference: string) => {
    await network.put(
      `apartment/like-status/${userApts[aptToDisplay]._id}?status=${preference}`
    );
    setAptToDisplay(aptToDisplay + 1);
  };

  const toggleFilters = () => {
    if (toggleFilterBtn.current) {
      const filtersDiv = toggleFilterBtn.current.lastChild as HTMLElement;
      filtersDiv.classList.toggle("toggle-filters");
    }
  };

  return (
    <div className={`${isprofileClicked && "z-index"} Home-container`}>
      <div className="Home-filter-component">
        <span className="Home-filter-btn" onClick={toggleFilters}>
          <i className="fas fa-bars"></i>
        </span>
        <div ref={toggleFilterBtn} className="Home-filter-toggle-div">
          <Filter />
        </div>
      </div>
      {userApts && aptToDisplay < userApts.length ? (
        <div className="Home-left-side">
          <div className="Home-apartment-component">
            <Apartment
              aptPreference={aptPreference}
              apt={userApts[aptToDisplay]}
            />
          </div>

          <span className="Home-map-button-span" onClick={ () => setShowMap((prev)=> !prev)}>
            <i className="fas fa-long-arrow-alt-down"></i> 
            Scroll down for GoogleMap 
            <i className="fas fa-long-arrow-alt-down"></i>
          </span>
          {showMap && (
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
          )}
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
