import React from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const SignUp = (props) => {
  const navigate = useNavigate();

  const [role, setRole] = React.useState("driver");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [streetName, setStreetName] = React.useState("");
  const [streetNumber, setStreetNumber] = React.useState("");
  const [postCode, setPostCode] = React.useState("");
  const [city, setCity] = React.useState("");

  const submitUserRegisteration = (event) => {
    event.preventDefault();
    signup(role, name, email, password)
      .then((response) => {
        if (response.status === 200) {
          props.setLoggedInUser(response.data);
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };
  const submitUserMech = (event) => {
    event.preventDefault();
    signup(
      role,
      name,
      email,
      password,
      streetName,
      streetNumber,
      postCode,
      city
    )
      .then((response) => {
        if (response.status === 200) {
          props.setLoggedInUser(response.data);
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <select
        name="role-select"
        onChange={(event) => setRole(event.target.value)}
      >
        <option name="driver">driver</option>
        <option name="mechanic">mechanic</option>
      </select>

      {role === "driver" ? (
        <>
          <form onSubmit={submitUserRegisteration}>
            <input
              type="text"
              placeholder="John"
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              placeholder="john@doe.com"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="*********"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button>Register</button>
          </form>
        </>
      ) : null}

      {role === "mechanic" ? (
        <>
          <form onSubmit={submitUserMech}>
            <input
              type="text"
              placeholder="John"
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              placeholder="john@doe.com"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="*********"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="streetName"
              placeholder="Landsberger"
              name="streetName"
              onChange={(event) => setStreetName(event.target.value)}
            />
            <input
              type="streetNumber"
              placeholder="123"
              name="streetNumber"
              onChange={(event) => setStreetNumber(event.target.value)}
            />
            <input
              type="postCode"
              placeholder="00000"
              name="postCode"
              onChange={(event) => setPostCode(event.target.value)}
            />
            <input
              type="city"
              placeholder="Place"
              name="city"
              onChange={(event) => setCity(event.target.value)}
            />
            <button>Register</button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default SignUp;
