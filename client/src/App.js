import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import axios from "axios";
// import { logout } from "./services/auth";
import Navbar from "./components/Navbar.jsx";
import MechDetails from "./components/MechDetails";
import Update from "./components/Update";

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios
      .get("/api/auth/loggedin")
      .then((response) => {
        setLoggedInUser(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // const logoutHandler = () => {
  //   logout()
  //     .then(() => prop.setLoggedInUser(null))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="App">
      {/* <h1>{loggedInUser ? loggedInUser.name : ""}</h1> */}
      {/* <button type="button" onClick={logoutHandler}>
        Logout
      </button> */}
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          <Navbar
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/signup"
                element={
                  <SignUp
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <Login
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={<Profile loggedInUser={loggedInUser} />}
              />
              <Route path="/profile/:id" element={<MechDetails />} />
              <Route
                path="/profile/:id/edit"
                element={
                  <Update
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
