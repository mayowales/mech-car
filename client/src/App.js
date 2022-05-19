import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import axios from "axios";
import { getAllMech } from "./services/userApi";
import Navbar from "./components/Navbar.jsx";
import MechDetails from "./components/MechDetails";
import Update from "./components/Update";
import { sendMessage, previousMessage } from './services/chatApi';
import io from "socket.io-client";
import ChatForm from './components/ChatForm';
import Footer from "./components/Footer";

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [mechList, setMechList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [selectedMechanic, setSelectedMechanic] = React.useState(null);
  const [displayChat, setDisplayChat] = React.useState(false);




  React.useEffect(() => {
    axios
      .get("/api/auth/loggedin")
      .then((response) => {
        setLoggedInUser(response.data);
        setLoading(false);
        getAllMech()
          .then((response) => {
            const mechanics = response;
            setMechList(mechanics);
          })
      })
      .catch((err) => console.log(err));
  }, []);


  const [feed, setFeed] = React.useState([]);


  const socketRef = React.useRef();

  React.useEffect(() => {
    feed && previousMessage(feed._id).then(res => setFeed(res.data)).catch(err => console.log(err))
  }, []);

  React.useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_API_BASE_URL);
    socketRef.current.on("message", (messageData) => {
      console.log('got it:', messageData)
      setDisplayChat(true)
      setFeed([...feed, messageData])
    });
    return () => socketRef.current.disconnect();
  }, []);

  return (
    <div className="App">

      {displayChat && <ChatForm socketRef={socketRef} feed={feed} setFeed={setFeed} loggedInUser={loggedInUser} mechanic={selectedMechanic} />}

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
              <Route
                path="/"
                element={
                  <Home
                    setDisplayChat={setDisplayChat}
                    setSelectedMechanic={setSelectedMechanic}
                    selectedMechanic={selectedMechanic}
                    mechList={mechList}
                    setMechList={setMechList}
                    loggedInUser={loggedInUser}
                  />
                }
              />
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
                element={
                  <Profile
                    loggedInUser={loggedInUser}
                    mechList={mechList}
                    setMechList={setMechList}
                  />
                }
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
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
