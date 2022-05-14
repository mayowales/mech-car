import React from "react";
import axios from "axios";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password)
      .then((response) => {
        // rapped in if statement
        if (response.status === 200) {
          props.setLoggedInUser(response.data);
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          onChange={handleEmail}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
