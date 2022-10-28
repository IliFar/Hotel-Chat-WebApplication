import React from "react";
import Room from "../room/Room";
import { AppContext } from "../../../context/Data";

const Rooms = () => {
  //Use AppContext to get all necessary data
  const { rooms, setId, showRoom, setShowRoom } = React.useContext(AppContext);

  return (
    <div className="rooms-container container mt-3 h-100 ">
      <div className="row justify-content-center gap-3">
        {!showRoom ? (  // If showRoom is false => show all rooms Else when a room is clicked, set the showRoom state to true and show the clicked Room
          <>
            <h1 className="text-white text-center">Enter a room</h1>
            {rooms.map((room, index) => (
              <div
                key={index}
                className="rooms card text-center w-md-75  col-md-4"
                onClick={() => {
                  setShowRoom(true);
                  setId(room.id);
                }}
              >
                <div className="card-body row">
                  <h1 className="card-title">{room.name}</h1>
                </div>
                <button className="enter-room btn btn-primary mb-3">
                  Enter Room
                </button>
              </div>
            ))}
          </>
        ) : (
          <Room /> //Show room when showRoom state is true
        )}
      </div>
    </div>
  );
};

export default Rooms;
