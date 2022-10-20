import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";

const Rooms = () => {
  const [rooms, setRooms] = React.useState([]);
  const navigate = useNavigate();

  const url = "https://localhost:5001/api/rooms";

  const getRooms = async () => {
    await axios.get(url).then((res) => {
      const data = res.data;
      setRooms(data);
    });
  };

  React.useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="rooms-container">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="rooms"
          onClick={() => {
            navigate(`room/${room.id}`);
          }}
        >
          {room.name}
          <button className="enter-room">Enter Room</button>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
