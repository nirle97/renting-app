import React, {useState} from "react";
import "./filter.css"
import network from "../../utils/network"
import { Slider } from "@material-ui/core"
import Range from "./Range"

function Filter() {
  return (
  <div className="Filter-container">
  
  <Range />
  </div>
  )
}
export default Filter;
