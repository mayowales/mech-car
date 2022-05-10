import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";
import Location from "../components/Location";

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const mapRef = useRef();
  const center = useMemo(
    () => ({
      lat: 52.31,
      lng: 13.3,
    }),
    []
  );
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div className="container">
      <div className="location">
        <h4>Enter your location here:</h4>
        <Location
          setCurrentLocation={(position) => {
            setCurrentLocation(position);
            mapRef.current.panTo(position);
          }}
        />
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={{
            width: "100%",
            height: "600px",
          }}
          options={options}
          onLoad={onLoad}
        >
          {currentLocation && <Marker position={currentLocation} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(Map);
