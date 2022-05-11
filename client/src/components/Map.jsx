import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";
import Location from "../components/Location";

const Map = (props) => {
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
  console.log(props.mechList[0].streetName);
  const allMech = props.mechList.map((mech) => {
    return mech.streetName + mech.streetNumber;
  });
  console.log(allMech);
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
          {props.mechList &&
            props.mechList.map((mech) => {
              console.log(
                mech.streetName +
                  mech.streetNumber +
                  ", " +
                  mech.city +
                  ", Germany"
              );
              return (
                <Marker
                  key={mech._id}
                  position={
                    (mech.streetName +
                      mech.streetNumber +
                      ", " +
                      mech.city +
                      ", Germany",
                    currentLocation)
                  }
                />
              );
            })}
          console.log(address.streetName)
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(Map);
