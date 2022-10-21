import React from "react";
import { useParams } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from "axios";
import Chat from "../chat/Chat";
import "./Room.css";

const Room = () => {
  const [roomById, setRoomById] = React.useState({});
  const [user, setUser] = React.useState();
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

  const joinRoom = async (e) => {
    e.preventDefault();
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat", {
          withCredentials: false,
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
        console.log("Message recieved", message);
        console.log("Message recieved2", user);
      });

      console.log(room.name);

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
      console.log(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      console.log(connection);
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getRoomById();
  }, []);
  return (
    <div className="room">
      <h1 className="room-name">{roomById.name}</h1>
      {!connection ? (
        <form onSubmit={joinRoom} className="join-form">
          <input
            className="username-input"
            type="text"
            placeholder="name"
            onChange={(e) => setUser(e.target.value)}
          />
          <button type="submit" className="join-btn">
            Join
          </button>
        </form>
      ) : (
        <Chat messages={messages} sendMessage={sendMessage} />
      )}
    </div>
  );
};

export default Room;
