import React, { useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useSelector } from "react-redux";
import { setPreferences, prefSelectors, PrefState } from "../../store/prefSlice";
interface LatLng {
  lat: number;
  lng: number;
}
interface IProps {
  searchValue: {
    cords: {
      lat: number;
      lng: number;
    };
    address: string;
  };
  setSearchValue: React.Dispatch<
    React.SetStateAction<{
      cords: {
        lat: number;
        lng: number;
      };
      address: string;
    }>
  >;
}

export default function SearchBar({ searchValue, setSearchValue }: IProps) {
  const { preferences }: PrefState = useSelector(prefSelectors);
  const [address, setAddress] = React.useState(preferences.address);
  const [coordinates, setCoordinates] = React.useState<LatLng>(searchValue.cords);
    useEffect(()=>{
      console.log(preferences.address);
      console.log(address);
      
    },[])
  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng: LatLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setSearchValue({
      cords: { lat: latLng.lat, lng: latLng.lng },
      address: value,
    });
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
