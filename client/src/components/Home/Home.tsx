import React, { useState } from "react";
import "./home.css";
import network from "../../utils/network";
import Filter from "../Filter/Filter";
import Apartment from "../Apartment/Apartment";
import { IFilter, IApt } from "../../interfaces/interface";
import { useEffect } from "react";
function Home() {
  const [aptArr, setAptArr] = useState<IApt[]>([]);
  const [aptToDisplay, setAptToDisplay] = useState<number>(0);
  const [currentFilter, SetCurrentFilter] = useState<IFilter>({
    city: "Tel-aviv",
    priceMin: 0,
    priceMax: 10000,
  });

  const updateFilter = (newFiltterObj: IFilter) => {
    SetCurrentFilter(newFiltterObj);
  };
  const clickedHandele = async () => {
    const {
      data: { data },
    } = await network.post("apartment/filtered-apts", currentFilter);
    setAptArr(data);
  };

  const aptPreference = async (preference: string) => {
      const res = await network.put(`apartment/like-status/${aptArr[aptToDisplay]._id}?status=${preference}`)
      console.log(res);
      console.log(preference);
      console.log(aptArr[aptToDisplay]._id);
      setAptToDisplay(aptToDisplay + 1)
      
      
  }
  
  return (
    <div className="Home-container">
      <button onClick={clickedHandele}>getApts</button>
      <div className="Home-filter-component">
        <Filter currentFilter={currentFilter} updateFilter={updateFilter} />
      </div>
      {aptArr.length > 0 && (
        <div className="Home-apartment-component">
          <Apartment aptPreference={aptPreference} apt={aptArr[aptToDisplay]} />
        </div>
      )}
    </div>
  );
}

export default Home;
