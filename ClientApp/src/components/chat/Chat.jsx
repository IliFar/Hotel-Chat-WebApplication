import React from "react";
import Message from "../message/Message";
import "./Chat.css";

const Chat = ({ messages, sendMessage, connection }) => {
  const [message, setMessage] = React.useState("");

  return (
    <div className="chat container d-flex flex-column bg-white gap-3">
      <Message messages={messages} />
      <form
        className="message-form mt-auto mb-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message, connection);
          setMessage("");
        }}
      >
        <div className="input-group">
          <input
            className="message-input form-control "
            type="text"
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            contentEditable="true"
          />
          <button
            type="submit"
            className="send-btn btn btn-primary"
            disabled={!message}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
