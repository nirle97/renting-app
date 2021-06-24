import React, { useState, useCallback } from "react";
import "./map.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface IProps {
  cords:  {
    lat: number,
    lng: number
  }
}
function Map({ cords }: IProps){
  const [mapContainerStyle, setMapContainerStyle] = useState(
    {
      height: "70vh",
      width: "40vw",
    })
  const [options, setOptions] = useState(
    {
      disableDefaultUI: false,
      zoomControl: true,
    })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries: ["places"],
});
  
  const mapRef:React.MutableRefObject<any> = React.useRef();
  
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  

  return (    
    <div>
      { loadError && <span>"Error"</span>} 
      { !isLoaded && <span>"Loading..."</span>}
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={cords}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker
          position={cords}  
        />
      </GoogleMap>
    </div>    
  );
}

export default Map;


