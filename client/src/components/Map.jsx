import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";
import Location from "../components/Location";
import { getGeocode, getLatLng } from "use-places-autocomplete";

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
  console.log(props.mechList);
  const allMech = props.mechList.map((mech) => {
    return mech.streetName + mech.streetNumber;
  });
  console.log(allMech);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const mechLocations = props.mechList.map((mech) => {
    const parameter = {
      address: mech.streetName + " ," + mech.streetNumber,
    };
    getGeocode(parameter).then((results) => {
      console.log(results);
      try {
        const { lat, lng } = getLatLng(results[0]);
        return { lat, lng };
        {
          /* props.setMechList({ lat, lng }); */
        }
      } catch (error) {
        return null;
      }
    });
  });

  console.log(mechLocations);

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
