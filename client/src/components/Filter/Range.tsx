import React, { useState } from "react";
import { Slider } from "@material-ui/core";
import { IFilter } from "../../interfaces/interface";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, prefSelectors } from "../../store/prefSlice";
interface IProps {
  setCurrentFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  currentFilter: IFilter;
  max: number;
  step: number;
  type: string;
}

function Range({ setCurrentFilter, currentFilter, max, step, type }: IProps) {
  const dispatch = useDispatch();
  const [filtterInput, setFiltterInput] = useState<number[]>([currentFilter.priceMin, currentFilter.priceMax]);
  const { preferences } = useSelector(prefSelectors);
  const changeHandler = (e: any, newValue: number | number[]) => {
    const value = newValue as number[];
    setFiltterInput(value);
    switch (type) {
      case "price":
        setCurrentFilter({
          ...currentFilter,
          priceMin: value[0],
          priceMax: value[1],
        });
        dispatch(
          setPreferences({
            preferences: {
              ...preferences,
              priceMin: value[0],
              priceMax: value[1],
            },
          })
        );
        break;
      case "size":
        setCurrentFilter({
          ...currentFilter,
          sizeMin: value[0],
          sizeMax: value[1],
        });
        dispatch(
          setPreferences({
            preferences: {
              ...preferences,
              sizeMin: value[0],
              sizeMax: value[1],
            },
          })
        );
        break;
      case "rooms":
        setCurrentFilter({
          ...currentFilter,
          roomsMin: value[0],
          roomsMax: value[1],
        });
        dispatch(
          setPreferences({
            preferences: {
              ...preferences,
              roomsMin: value[0],
              roomsMax: value[1],
            },
          })
        );
        break;
    }
  };
  return (
    <div className="Range-slider">
      <Slider
        value={filtterInput}
        onChange={changeHandler}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        max={max}
        step={step}
      />
    </div>
  );
}
export default Range;
