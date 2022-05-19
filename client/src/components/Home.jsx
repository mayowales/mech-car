import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "../components/Map";

const Home = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div>i am home</div>
      {props.loggedInUser.role === "driver" ? (
        <div>
          <Map
            setDisplayChat={props.setDisplayChat}
            setSelectedMechanic={props.setSelectedMechanic}
            selectedMechanic={props.selectedMechanic}
            mechList={props.mechList}
            setMechList={props.setMechList}
            loggedInUser={props.loggedInUser}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
