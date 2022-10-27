import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="rooms-container row mt-5 gap-3 h-100 justify-content-center">
      
      {rooms.map((room, index) => (
        <div
          key={index}
          className="rooms card text-center w-75 col-md-4"
          onClick={() => {
            navigate(`room/${room.id}`);
          }}
        >
          <div className="card-body row">
            <h1 className="card-title">{room.name}</h1>
          </div>
          <button className="enter-room btn btn-primary mb-3">Enter Room</button>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
