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
  const [mechLocations, setMechLocations] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);


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


  props.mechList.forEach((mech) => {
    const parameter = {
      address: mech.streetName + " ," + mech.streetNumber,
    };
    getGeocode(parameter).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      if (!mechLocations.find(m => m._id === mech._id)) {
        setMechLocations([...mechLocations, { lat, lng, ...mech }])
      };
    }).catch(error => console.log(error));
  });

  const handleMechMarkerClick = (selectedMech) => { setSelectedMechanic(selectedMech) }

  return (
    <div className="container">
      <div className="location">
        <h4>Enter your location here:</h4>
        <Location
          selectedMechanic={selectedMechanic}
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
          {mechLocations.map(mechanic => <Marker key={mechanic._id} position={{ lat: mechanic.lat, lng: mechanic.lng }} onClick={() => handleMechMarkerClick(mechanic)} />)}
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(Map);
