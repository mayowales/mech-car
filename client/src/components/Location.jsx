import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
// import ChatForm from "../components/ChatForm";

const Location = (props) => {
  // const [displayChat, setDisplayChat] = React.useState(false);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    props.setCurrentLocation({ lat, lng });
  };

  // const openChatBox = () => {
  //   setDisplayChat(true);
  // };
  return (
    <>
      <div>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            className="location-input"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        {props.selectedMechanic && (
          <>
            <div>
              <h3>{props.selectedMechanic.name}</h3>

              <p>{`${props.selectedMechanic.streetName} ${props.selectedMechanic.streetNumber}, ${props.selectedMechanic.city}`}</p>
            </div>
            <button onClick={() => props.setDisplayChat(true)}>Chat</button>
          </>
        )}
        {props.directions && (
          <>
            {" "}
            <div>
              <h5>
                distance: {props.directions.routes[0].legs[0].distance.text}
              </h5>
              <h5>
                duration: {props.directions.routes[0].legs[0].duration.text}
              </h5>
            </div>
          </>
        )}
      </div>
      {/* {displayChat && (
        <ChatForm loggedInUser={props.loggedInUser} mechanic={props.selectedMechanic} />
      )} */}
    </>
  );
};

export default Location;
