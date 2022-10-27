import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./components/room/Room";
import Rooms from "./components/rooms/Rooms";
import "bootstrap/dist/css/bootstrap.min.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const App = () => {
  const joinRoom = async (user, room, setConnection, setMessages, setUsers) => {
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

  const closeConnection = async (connection) => {
    try {
      await connection.stop();
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message, connection) => {
    try {
      console.log(connection);
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app container">
      <Router>
        <Routes>
          <Route path="/" element={<Rooms />} />
          <Route
            path="room/:id"
            element={
              <Room
                joinRoom={joinRoom}
                sendMessage={sendMessage}
                closeConnection={closeConnection}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
