import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from "axios";
import React from "react";

export const AppContext = React.createContext({});

const Data = (props) => {
  const [user, setUser] = React.useState();
  const [roomById, setRoomById] = React.useState({});
  const [room, setRoom] = React.useState();
  const [connection, setConnection] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [id, setId] = React.useState();
  const [showRoom, setShowRoom] = React.useState(false);

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat", {
          withCredentials: false,
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("UsersInRoom", (users) => {
        console.log("users", users);
        setUsers(users);
      });

    
      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
        console.log("Message recieved", message);
        console.log("Message recieved2", user);
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
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

 

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      console.log(connection);
      await connection.invoke("SendMessageToGroup", message);
    } catch (error) {
      console.log(error);
    }
  };

  const url = "https://localhost:5001/api/rooms";

  const getRooms = async () => {
    await axios.get(url).then((res) => {
      const data = res.data;
      console.log(data);
      setRooms(data);
    });
  };

  React.useEffect(() => {
    getRooms();
  }, []);

  const getRoomById = async () => {
    await axios.get(`${url}/${id}`).then((res) => {
      const roomById = res.data;
      setRoomById(roomById);
      setRoom(roomById.name);
      console.log("roomname", roomById.name);
      console.log(roomById);
    });
  };

  return (
    <>
      <AppContext.Provider
        value={{
          rooms,
          setId,
          id,
          roomById,
          connection,
          getRoomById,
          setUser,
          joinRoom,
          users,
          message,
          messages,
          setMessage,
          sendMessage,
          closeConnection,
          showRoom,
          setShowRoom,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export default Data;
