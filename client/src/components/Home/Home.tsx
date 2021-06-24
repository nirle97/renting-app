import React, { useState } from "react";
import "./home.css";
import network from "../../utils/network";
import Filter from "../Filter/Filter";
import Apartment from "../Apartment/Apartment";
import SearchBar from "../SearchBar/searchBar";
import { IFilter, IApt } from "../../interfaces/interface";
import { useEffect } from "react";
import { profileSelectors } from "../../store/profileSlice";
import { useSelector } from "react-redux";
function Home() {
  const [aptArr, setAptArr] = useState<IApt[]>([]);
  const [aptToDisplay, setAptToDisplay] = useState<number>(0);
  const { isprofileClicked } = useSelector(profileSelectors);
  const [currentFilter, SetCurrentFilter] = useState<IFilter>({
    city: "Tel-aviv",
    priceMin: 0,
    priceMax: 10000,
  });

  const updateFilter = (newFiltterObj: IFilter) => {
    SetCurrentFilter(newFiltterObj);
  };
  useEffect(() => {
    getAptsByFilters();
  }, []);
  async function getAptsByFilters() {
    const {
      data: { data },
    } = await network.post("apartment/filtered-apts", currentFilter);
    setAptArr(data);
  }

  const aptPreference = async (preference: string) => {
    const res = await network.put(
      `apartment/like-status/${aptArr[aptToDisplay]._id}?status=${preference}`
    );
    setAptToDisplay(aptToDisplay + 1);
  };

  return (
    <div className={`${isprofileClicked && "z-index"} Home-container`}>
      <div className="Home-filter-component">
        <Filter currentFilter={currentFilter} updateFilter={updateFilter} />
      </div>
      <SearchBar />
      {aptToDisplay < aptArr.length ? (
        <div className="Home-left-side">
          <div className="Home-apartment-component">
            <Apartment
              aptPreference={aptPreference}
              apt={aptArr[aptToDisplay]}
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
