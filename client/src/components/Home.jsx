import React from "react";
import { Link } from "react-router-dom";
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
      {props.loggedInUser.role === "driver" ? (
        <div>
          <Map
            mechList={props.mechList}
            setMechList={props.setMechList}
            loggedInUser={props.loggedInUser}
          />
        </div>
      ) : (
        <>
          {" "}
          <div className="mydiv w3-container ">
            <div className="home-1 w3-display-topmiddle w3-hide-small ">
              <img
                class="blur"
                src="https://images-na.ssl-images-amazon.com/images/I/81fmprLRDhL.png"
                width="150"
                height="120"
              ></img>
            </div>
            <div className="home-2 w3-display-bottommiddle w3-hide-small ">
              <Link to="/signup">
                <button class="w3-button w3-black">Register</button>
              </Link>{" "}
              <Link to="/login">
                <button class="w3-button w3-teal">Login</button>
              </Link>
            </div>
          </div>
        </>
      )}

      {props.loggedInUser.role === "mechanic" ? null : (
        <>
          <div className="mydiv w3-container ">
            <div className="home-1 w3-display-topmiddle w3-hide-small ">
              <img
                class="blur"
                src="https://images-na.ssl-images-amazon.com/images/I/81fmprLRDhL.png"
                width="150"
                height="120"
              ></img>
            </div>
            <div className="home-2 w3-display-bottommiddle w3-hide-small ">
              <Link to="/signup">
                <button class="w3-button w3-black">Register</button>
              </Link>{" "}
              <Link to="/login">
                <button class="w3-button w3-teal">Login</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
