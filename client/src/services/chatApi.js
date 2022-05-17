import axios from "axios";

const sendMessage = (user, newMessage) => {
  axios.post("/api/chat/new-message", { sendBy: user, newMessage });
};

const previousMessage = () => {
  axios.get("/api/chat");
};

export { sendMessage, previousMessage };
