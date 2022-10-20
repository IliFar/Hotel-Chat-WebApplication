import React from "react";
import { useParams } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from "axios";

const Room = () => {
  const [roomById, setRoomById] = React.useState({});
  const [user, setUser] = React.useState();
  const [room, setRoom] = React.useState();
  const [connection, setConnection] = React.useState();

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

      connection.on("RecieveMessage", (message) => {
        // setMessages(messages => [...messages, {user, message}])
        console.log("Message recieved", message);
      });

      console.log(room.name);

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getRoomById()
  }, [])
  return (
    <div>
      {roomById.name}
      {!connection ? (
        <form onSubmit={joinRoom}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setUser(e.target.value)}
          />
          {/* <input
          type="text"
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        /> */}
          <button type="submit">Join</button>
        </form>
      ) : (
        user
      )}
    </div>
  );
};

export default Room;
