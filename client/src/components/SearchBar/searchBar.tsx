import React from "react";
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

  return (
    <div className="searchBar-container">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className={searchBarClass}
              {...getInputProps({ placeholder: "Type address" })}
            />
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion, i) => {
                const style =
                  searchBarClass === "Filter-search"
                    ? {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      }
                    : {
                        backgroundColor: suggestion.active
                          ? "#41b6e6"
                          : "#f5cabc",
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
