import React from "react";
import io from "socket.io-client";
import { sendMessage, previousMessage } from '../services/chatApi';

const ChatForm = ({ loggedInUser, mechanic }) => {

  const [feed, setFeed] = React.useState([]);

  const [message, setMessage] = React.useState('');

  const socketRef = React.useRef();

  React.useEffect(() => {
    previousMessage().then(res => setFeed(res.data)).catch(err => console.log(err))
  }, []);

  React.useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_API_BASE_URL);
    socketRef.current.on("message", (messageData) => {
      setFeed([...feed, messageData])
    });
    return () => socketRef.current.disconnect();
  }, [feed]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(loggedInUser, message).then(response => {
      const savedMessage = response.data;
      setFeed([...feed, savedMessage])
      socketRef.current.emit("message", { ...savedMessage, sendBy: loggedInUser })
      setMessage('');
    }).catch(err => console.log(err))
    // chat.sendMessage(loggedInUser, newMessage).then(response => {
    // socketRef.current.emit("message", { ...response.data, sendBy: loggedInUser })
    // setFeed([...feed, { ...response.data, sendBy: loggedInUser }]);
    // }).catch(err => console.log(err));
  };

  const messageBubble = feed.map(message => {
    return (
      <p key={message._id}>{message.message}</p>
    )
  })

  const handleChangeMessage = (event) => {
    const { value } = event.target;
    setMessage(value)
  }


  return (
    <div className="chat">
      <h3>Chat with {mechanic.name}</h3>


      <div className="chat-window">

        <div className="chat-body">
          {messageBubble}
        </div>

        <div className="chat-footer">
          <form onSubmit={handleSendMessage}>

            <textarea value={message} onChange={handleChangeMessage} name="message" placeholder="Type your message here"></textarea>
            <button type='submit'>send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ChatForm;
