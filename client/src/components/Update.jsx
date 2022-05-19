import React from "react";
import { updateUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";

const Update = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = React.useState(props.loggedInUser.role);
  const [name, setName] = React.useState(props.loggedInUser.name);
  const [email, setEmail] = React.useState(props.loggedInUser.email);
  const [password, setPassword] = React.useState(props.loggedInUser.password);
  const [streetName, setStreetName] = React.useState(
    props.loggedInUser.streetName
  );
  const [streetNumber, setStreetNumber] = React.useState(
    props.loggedInUser.streetNumber
  );
  const [postCode, setPostCode] = React.useState(props.loggedInUser.postCode);
  const [city, setCity] = React.useState(props.loggedInUser.city);

  const updateDriverHandle = (event) => {
    event.preventDefault();
    updateUser(id, { name, email, password })
      .then((response) => {
        props.setLoggedInUser(response);
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };
  const updateMechHandle = (event) => {
    event.preventDefault();
    updateUser(id, { name, email, streetName, streetNumber, postCode, city })
      .then((response) => {
        props.setLoggedInUser(response);
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      {props.loggedInUser.role === "driver" ? (
        <>
          <div className="form-container">
            <form onSubmit={updateDriverHandle}>
              <input
                type="text"
                defaultValue={props.loggedInUser.name}
                name="name"
                onChange={(event) => setName(event.target.value)}
              />
              <input
                type="email"
                defaultValue={props.loggedInUser.email}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
              />

              <button>Update info</button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="form-container">
            <form onSubmit={updateMechHandle}>
              <input
                type="text"
                defaultValue={props.loggedInUser.name}
                name="name"
                onChange={(event) => setName(event.target.value)}
              />
              <input
                type="email"
                defaultValue={props.loggedInUser.email}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                type="streetName"
                defaultValue={props.loggedInUser.streetName}
                name="streetName"
                onChange={(event) => setStreetName(event.target.value)}
              />
              <input
                type="streetNumber"
                defaultValue={props.loggedInUser.streetNumber}
                name="streetNumber"
                onChange={(event) => setStreetNumber(event.target.value)}
              />
              <input
                type="postCode"
                defaultValue={props.loggedInUser.postCode}
                name="postCode"
                onChange={(event) => setPostCode(event.target.value)}
              />
              <input
                type="city"
                defaultValue={props.loggedInUser.city}
                name="city"
                onChange={(event) => setCity(event.target.value)}
              />
              <button>Update info</button>
            </form>
          </div>
        </>
      )}

      {/* {role === "mechanic" ? (
        <>
          <form onSubmit={updateMechHandle}>
            <input
              type="text"
              defaultValue={props.loggedInUser.name}
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              defaultValue={props.loggedInUser.email}
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              type="streetName"
              defaultValue={props.loggedInUser.streetName}
              name="streetName"
              onChange={(event) => setStreetName(event.target.value)}
            />
            <input
              type="streetNumber"
              defaultValue={props.loggedInUser.streetNumber}
              name="streetNumber"
              onChange={(event) => setStreetNumber(event.target.value)}
            />
            <input
              type="postCode"
              defaultValue={props.loggedInUser.postCode}
              name="postCode"
              onChange={(event) => setPostCode(event.target.value)}
            />
            <input
              type="city"
              defaultValue={props.loggedInUser.city}
              name="city"
              onChange={(event) => setCity(event.target.value)}
            />
            <button>Update info</button>
          </form>
        </>
      ) : null} */}
    </div>
  );
};

export default Update;
