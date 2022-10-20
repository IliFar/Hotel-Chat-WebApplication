import React from "react";

const Chat = ({ messages, sendMessage }) => {
  const [message, setMessage] = React.useState("");

  return (
    <div>
      {messages.map((m, index) => (
        <div key={index}>
          <div>{m.message}</div>
          <div>{m.user}</div>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }}
      >
        <input
          type="text"
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
