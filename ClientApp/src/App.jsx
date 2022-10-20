import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Room from "./components/Room";
import Rooms from "./components/Rooms";


const App = () => {
  return (
    <div>
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
