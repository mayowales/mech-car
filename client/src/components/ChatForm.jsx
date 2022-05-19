import React from "react";
import { sendMessage, previousMessage } from '../services/chatApi';

const ChatForm = ({ socketRef, loggedInUser, mechanic, feed, setFeed }) => {

  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const conv = loggedInUser.activeConversations.find(conv => conv.participants.includes(mechanic._id));
    setFeed(conv?.messages || {})
  }, [mechanic._id]);

  const handleSendMessage = (event) => {

    event.preventDefault();

    sendMessage(feed._id, message).then(response => {

      const newFeed = response;
      setFeed({ ...feed, messages: newFeed.messages })
      socketRef.current.emit("message", { ...message, sendBy: loggedInUser })
      setMessage('');
    }).catch(err => console.log(err))
  };

  const messageBubble = feed.messages?.map(message => {
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
