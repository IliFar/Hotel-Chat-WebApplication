import React from "react";
import "./Message.css";

const Message = ({ messages }) => {
  
  const messageRef = React.useRef(); //Create a react Ref

  // Logic to scroll to the latest message in this component
  React.useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="messages" ref={messageRef}>
      {messages.map((m, index) => (
        <div
          key={index}
          className="message-container d-flex flex-column align-items-end"
        >
          <div className="message bg-primary p-1 text-white rounded ">
            {m.message}
          </div>
          <div className="user">{m.user}</div>
        </div>
      ))}
    </div>
  );
};

export default Message;
