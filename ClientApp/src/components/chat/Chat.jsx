import React from "react";
import { AppContext } from "../../../context/Data";
import Message from "../message/Message";
import { MentionsInput, Mention } from "react-mentions";
import "./Chat.css";

const Chat = () => {

  //Use AppContext to get all necessary data
  const { message, messages, setMessage, sendMessage, connection, roomById } =
    React.useContext(AppContext); 

  // Create a const to return the data needed for the react mentions, this data is from the REST API (each room has a todo list)
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
          sendMessage();
          setMessage("");
        }}
      >
        <div className="input-group">
          {/*React MentionsInput from the React Mentions Library */} 
          <MentionsInput
            className="message-input form-control "
            type="text"
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => e.target.value}
            singleLine={true}
          >
            <Mention
              trigger="@"
              data={todos}
              markup="@__display__"
              className="h-75"
            />
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
