import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  DirectionsService,
  MarkerClusterer,
} from "@react-google-maps/api";
import Location from "../components/Location";
import { getGeocode, getLatLng } from "use-places-autocomplete";

const Map = (props) => {
  const [currentLocation, setCurrentLocation] = useState();
  const [mechLocations, setMechLocations] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [directions, setDirections] = useState();

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
  console.log(props.mechList);
  props.mechList.forEach((mech) => {
    const parameter = {
      address: mech.streetName + " ," + mech.streetNumber,
    };
    getGeocode(parameter)
      .then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        if (!mechLocations.find((m) => m._id === mech._id)) {
          console.log(mech._id);
          setMechLocations([...mechLocations, { lat, lng, ...mech }]);
        }
      })
      .catch((error) => console.log(error));
  });
  console.log(mechLocations);
  const handleMechMarkerClick = (selectedMech) => {
    setSelectedMechanic(selectedMech);
  };

  const fetchDirections = (position) => {
    if (!currentLocation) return;
    console.log(position);
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: position,
        destination: currentLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };
  console.log(directions);
  return (
    <div className="container">
      <div className="location">
        <h4>Enter your location here:</h4>
        <Location
          selectedMechanic={selectedMechanic}
          directions={directions}
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
          {directions && (
            <DirectionsRenderer
              directions={directions}
              onDirectionsChanged={() => {
                return;
              }}
            />
          )}
          {currentLocation && (
            <Marker
              position={currentLocation}
              icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
            />
          )}
          {mechLocations.map((mechanic) => (
            <Marker
              key={mechanic._id}
              position={{ lat: mechanic.lat, lng: mechanic.lng }}
              onClick={() => {
                handleMechMarkerClick(mechanic);
                fetchDirections(mechanic);
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default React.memo(Map);
