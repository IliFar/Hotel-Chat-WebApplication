import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

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
    <div>
      {rooms.map((room) => (
        <>
          <div
            onClick={() => {
              navigate(`room/${room.id}`);
            }}
          >
            {room.name}
          </div>
        </>
      ))}
    </div>
  );
};

export default Rooms;
