import React, {useState} from "react";
import { Slider } from "@material-ui/core"
import { IFilter } from "../../interfaces/interface"
interface IProps {
  updateFilter: (newFiltterObj: IFilter ) => void ,
  currentFilter: IFilter 
}

function Range({updateFilter, currentFilter}: IProps) {
  const [filtterInput, setFiltterInput] = useState<number[]>([20, 37])
  const changeHandler = (e: any, newValue: number | number[]) => {
    const value = newValue as number[]
    setFiltterInput(value);
    updateFilter({ 
      city: currentFilter.city,
      priceMin: value[0],
      priceMax: value[1]
    })
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
