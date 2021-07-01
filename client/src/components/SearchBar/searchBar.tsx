import React from "react";
import "./searchBar.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface LatLng {
  lat: number;
  lng: number;
}
interface IProps {
  searchBarClass: string;
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

export default function SearchBar({
  searchValue,
  setSearchValue,
  searchBarClass,
}: IProps) {
  const [address, setAddress] = React.useState(searchValue.address);
  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng: LatLng = await getLatLng(results[0]);
    setAddress(value);
    setSearchValue({
      cords: { lat: latLng.lat, lng: latLng.lng },
      address: value,
    });
  };
  const searchOptions = {
    location: new google.maps.LatLng(32.0853, 34.7818),
    radius: 50000000,
  };
  return (
    <div className="searchBar-container">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              id="SearchBar-input"
              {...getInputProps({ placeholder: "Type address" })}
            />
            <div className="SearchBar-div">
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion, i) => {
                const style =
                  searchBarClass === "Filter-search"
                    ? {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                        width: "12vw",
                      }
                    : {
                        backgroundColor: suggestion.active
                          ? "#41b6e6"
                          : "#f5cabc",
                        width: "12vw",
                      };

                return (
                  <div
                    className="SearchBar-suggestion"
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
