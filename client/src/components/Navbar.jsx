import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
import { logout } from "../services/auth";

const Navbar = (props) => {
  const navigate = useNavigate();
  //   console.log(props);
  const logoutHandler = () => {
    logout()
      .then(() => {
        props.setLoggedInUser(null);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <header>
      <nav className="row">
        <NavLink to="/" activeclassname="active">
          Home
        </NavLink>
        {!props.loggedInUser ? (
          <>
            <NavLink to="/signup" activeclassname="active">
              Signup
            </NavLink>
            <NavLink to="/login" activeclassname="active">
              Login
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile" activeclassname="active">
              Profile
            </NavLink>
            <NavLink
              to={`/profile/${props.loggedInUser._id}/edit`}
              activeclassname="active"
            >
              Edit
            </NavLink>
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
