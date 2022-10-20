import React from "react";
import "./Chat.css";

const Chat = ({ messages, sendMessage }) => {
  const [message, setMessage] = React.useState("");

  return (
    <div className="chat">
      {messages.map((m, index) => (
        <div key={index}>
          <div className="message">{m.message}</div>
          <div className="user">{m.user}</div>
        </div>
      ))}
      <form
        className="message-form"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }}
      >
        <input
          className="message-input"
          type="text"
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
