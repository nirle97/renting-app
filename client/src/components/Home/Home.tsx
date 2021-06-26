import { useState } from "react";
import "./home.css";
import network from "../../utils/network";
import Filter from "../Filter/Filter";
import Apartment from "../Apartment/Apartment";
import { IApt } from "../../interfaces/interface";
import { useEffect } from "react";
import { profileSelectors } from "../../store/profileSlice";
import { prefSelectors, setPreferences } from "../../store/prefSlice";
import { useDispatch, useSelector } from "react-redux";
import Map from "../Map/Map";

function Home() {
  const [aptArr, setAptArr] = useState<IApt[]>([]);
  const [aptToDisplay, setAptToDisplay] = useState<number>(0);
  const { isprofileClicked } = useSelector(profileSelectors);
  const dispatch = useDispatch();
  const { preferences } = useSelector(prefSelectors);

  useEffect(() => {
    getUserPref();
  }, []);

  const getUserPref = async () => {
    const {
      data: { data },
    } = await network.get("/preference/user-preferences");
    if (data) {
      dispatch(setPreferences({ preferences: data.data.preferences }));
    }
  };

  const aptPreference = async (preference: string) => {
    const res = await network.put(
      `apartment/like-status/${aptArr[aptToDisplay]._id}?status=${preference}`
    );
    setAptToDisplay(aptToDisplay + 1);
  };

  return (
    <div className={`${isprofileClicked && "z-index"} Home-container`}>
      <div className="Home-filter-component">
        <Filter setAptArr={setAptArr} />
      </div>
      {aptToDisplay < aptArr.length ? (
        <div className="Home-left-side">
          <div className="Home-apartment-component">
            <Apartment
              aptPreference={aptPreference}
              apt={aptArr[aptToDisplay]}
            />
          </div>
          <div className="Home-apartment-map">
            <Map
              cords={
                aptArr[aptToDisplay].cords
                  ? aptArr[aptToDisplay].cords
                  : {
                      lat: 32.1149489,
                      lng: 34.8271349,
                    }
              }
            />
          </div>
          <div className="Home-apartment-map">map</div>
        </div>
      ) : (
        <div>no new apartments are found for your filters</div>
      )}
    </div>
  );
}

export default Home;
