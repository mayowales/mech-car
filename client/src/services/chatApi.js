import axios from "axios";

const sendMessage = (user, newMessage) => {
  return axios.post("/api/chat/new-message", { sendBy: user, newMessage });
};

const previousMessage = () => {
  return axios.get("/api/chat");
};

export { sendMessage, previousMessage };
