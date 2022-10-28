import React from "react";
import Rooms from "./components/rooms/Rooms";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "../context/Data";

const App = () => {
  return (
    <div className="app container">
      <div className="text-center mt-3 mb-3">
        <img
          src="https://thelumahotel.com/wp-content/uploads/2021/12/LUMA-LOGO-WORDING-1.png"
          alt=""
          className="img"
        />
        <hr className="text-white border-top border-5"/>
      </div>
      <Data>
        <Rooms />
      </Data>
    </div>
  );
};

export default App;
