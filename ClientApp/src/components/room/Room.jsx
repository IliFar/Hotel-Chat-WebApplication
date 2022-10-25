import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chat from "../chat/Chat";

const Room = ({ joinRoom, sendMessage, closeConnection }) => {
  const [user, setUser] = React.useState();
  const [roomById, setRoomById] = React.useState({});
  const [room, setRoom] = React.useState();
  const [connection, setConnection] = React.useState();
  const [messages, setMessages] = React.useState([]);

  let params = useParams();

  const url = "https://localhost:5001/api/rooms";

  const getRoomById = async () => {
    await axios.get(`${url}/${params.id}`).then((res) => {
      const roomById = res.data;
      setRoomById(roomById);
      setRoom(roomById.name);
      console.log("roomname", roomById.name);
      console.log(roomById);
    });
  };

  React.useEffect(() => {
    getRoomById();
  }, [messages]);

  return (
    <div className="room container mt-5">
      <h1 className="room-name text-white mb-5">{roomById.name}</h1>
      {connection && (
        <button
          className="btn btn-danger mb-3"
          onClick={() => closeConnection(connection)}
        >
          Leave Room
        </button>
      )}
      {!connection ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            joinRoom(user, room, setConnection, setMessages);
          }}
          className="join-form justify-content-center"
        >
          <div className="input-group">
            <input
              className="username-input form-control"
              type="text"
              placeholder="name"
              onChange={(e) => setUser(e.target.value)}
            />
            <button type="submit" className="join-btn btn btn-primary">
              Join
            </button>
          </div>
        </form>
      ) : (
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          connection={connection}
        />
      )}
    </div>
  );
};

export default Room;
