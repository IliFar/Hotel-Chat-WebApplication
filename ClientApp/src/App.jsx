import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./components/room/Room";
import Rooms from "./components/rooms/Rooms";
import "bootstrap/dist/css/bootstrap.min.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Data from "../context/Data";

const App = () => {
  return (
    <div className="app container">
      <Data>
        <Rooms />
      </Data>
    </div>
  );
};

export default App;
