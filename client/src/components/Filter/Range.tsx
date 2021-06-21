import React, {useState} from "react";
import { Slider } from "@material-ui/core"

function Range() {
  const [filtterInput, setFiltterInput] = useState<number[]>([20, 37])
  const changeHandler = (e: any, newValue: number | number[]) => {
    setFiltterInput(newValue as number[]);
  };
  
  return (
  <Slider
    value={filtterInput}
    onChange={changeHandler}
    valueLabelDisplay="auto"
    aria-labelledby="range-slider"
    max={10000}
    step={100}
  />
  )}
export default Range;
