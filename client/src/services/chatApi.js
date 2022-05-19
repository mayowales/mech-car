import axios from "axios";

const sendMessage = (convId, messageData) => {
  return axios.post(`/api/chat/${convId}/new-message`, { messageData })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response.data;
    });
}

const previousMessage = (participants) => {
  return axios.post(`/api/chat/`, { participants });
};

export { sendMessage, previousMessage };