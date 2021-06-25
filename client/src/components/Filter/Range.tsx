import  { useEffect, useState } from "react";
import { Slider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, prefSelectors } from "../../store/prefSlice";
interface IProps {
  max: number;
  step: number;
  type: string;
}

function Range({ max, step, type }: IProps) {
  const dispatch = useDispatch();
  const { preferences } = useSelector(prefSelectors);
  const [filtterInput, setFiltterInput] = useState<number[]>([0,1]);

  useEffect(()=> {
    switch (type) {
      case "price":
        setFiltterInput([Number(preferences.priceMin),Number(preferences.priceMax)]);
        break;
      case "size":
        setFiltterInput([Number(preferences.sizeMin), Number(preferences.sizeMax)]);
        break;
      case "rooms":
        setFiltterInput([Number(preferences.roomsMin), Number(preferences.roomsMax)]);
        break;
    }
  }, [])
  const changeHandler = (e: any, newValue: number | number[]) => {
    const value = newValue as number[];
    setFiltterInput(value);
    switch (type) {
      case "price":
        dispatch(
          setPreferences({
            preferences: {
              ...preferences,
              priceMin: value[0],
              priceMax: value[1],
            },
          })
        );
        setFiltterInput([value[0], value[1]]);
        break;
      case "size":
        dispatch(
          setPreferences({
            preferences: {
              ...preferences,
              sizeMin: value[0],
              sizeMax: value[1],
            },
          })
        );
        setFiltterInput([value[0], value[1]]);
        break;
      case "rooms":
        dispatch(
          setPreferences({
            preferences: {
              ...preferences,
              roomsMin: value[0],
              roomsMax: value[1],
            },
          })
        );
        setFiltterInput([value[0], value[1]]);
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
