import React, { useState } from "react";
import "./filter.css";
import network from "../../utils/network";
import Range from "./Range";
import { IFilter } from "../../interfaces/interface";

interface IProps {
  updateFilter: (newFiltterObj: IFilter) => void;
  currentFilter: IFilter;
}

function Filter({ updateFilter, currentFilter }: IProps) {
  const [userFilters, setUserFilters] = useState([]);
  return (
    <div className="Filter-container">
      <span className="Filter-price-name"> price range: </span>
      <Range currentFilter={currentFilter} updateFilter={updateFilter} />
      <span className="Filter-price-min-span">{currentFilter.priceMin}</span>
      <span className="Filter-price-max-span">{currentFilter.priceMax}</span>
    </div>
  );
}
export default Filter;
