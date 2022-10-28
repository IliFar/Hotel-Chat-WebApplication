import React from "react";
import { AppContext } from "../../../context/Data";
import Message from "../message/Message";
import { MentionsInput, Mention } from "react-mentions";
import "./Chat.css";

const Chat = () => {
  const { message, messages, setMessage, sendMessage, connection, roomById } =
    React.useContext(AppContext);

    const todos = roomById.todo.map((todo, i) => {
      return { id: i, display: todo.title };
    });


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
          <MentionsInput
            className="message-input form-control "
            type="text"
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => e.target.value}
            singleLine={true}
            inputRef={messageRef}
          >
            <Mention trigger="@" data={todos} markup="@__display__" />
          </MentionsInput>
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
