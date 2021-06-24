import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences, prefSelectors } from "../../store/prefSlice";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
interface LatLng {
  lat: number;
  lng: number;
}
export default function SearchBar() {
  const dispatch = useDispatch();
  const { preferences } = useSelector(prefSelectors);
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState<LatLng>({
    lat: 0,
    lng: 0,
  });

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng: LatLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    dispatch(
      setPreferences({ preferences: { ...preferences, address: value } })
    );
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion, i) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={i}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
