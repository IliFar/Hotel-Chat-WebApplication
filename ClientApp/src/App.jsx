import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Room from "./components/room/Room";
import Rooms from "./components/rooms/Rooms";
import "./App.css";


const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
            <Route path="/" element={<Rooms/>} />
            <Route path="room/:id" element={<Room />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
