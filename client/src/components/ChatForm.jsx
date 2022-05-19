import React from "react";
// import io from "socket.io-client";
import { sendMessage, previousMessage } from '../services/chatApi';

const ChatForm = ({ socketRef, loggedInUser, mechanic, feed, setFeed }) => {

  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    previousMessage([
      loggedInUser._id,
      mechanic._id
    ]).then(res => setFeed(res.data)).catch(err => console.log(err))
  }, [loggedInUser._id, mechanic._id, setFeed]);


  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(feed._id, message).then(response => {
      const newFeed = response.data;
      setFeed({ ...feed, messages: newFeed.messages })
      socketRef.current.emit("message", { ...message, sendBy: loggedInUser })
      setMessage('');
    }).catch(err => console.log(err))
  };

  const messageBubble = feed.messages.map(message => {
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
