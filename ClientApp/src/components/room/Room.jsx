import React from "react";
import Chat from "../chat/Chat";
import { AppContext } from "../../../context/Data";

const Room = () => {
  const {
    roomById,
    connection,
    getRoomById,
    setUser,
    joinRoom,
    users,
    closeConnection,
    setShowRoom,
  } = React.useContext(AppContext);

  const url = "https://localhost:5001/api/rooms";

  React.useEffect(() => {
    getRoomById();
  }, []);

  return (
    <div className="room container ">
      <h1 className="room-name text-white mb-3">{roomById.name}</h1>

      {connection && (
        <>
          <p className="text-white border border-2 rounded-3 bg-success p-2">Type @ in the message box to mention a task.</p>
          <h5 className="text-white">Users in Room :</h5>
          <ol >
            {users.map((user, index) => (
              <li key={index} className="text-white">
                {user}
              </li>
            ))}
          </ol>
          <button
            className="btn btn-danger mb-3"
            onClick={() => {
              closeConnection(connection);
              setShowRoom(false);
            }}
          >
            Leave Room
          </button>
        </>
      )}
      {!connection ? (
        <>
        <h3 className="text-white">Join this room</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            joinRoom();
          }}
          className="join-form justify-content-center"
        >
          <div className="input-group">
            <input
              className="username-input form-control"
              type="text"
              placeholder="name"
              onChange={(e) => setUser(e.target.value)}
            />
            <button type="submit" className="join-btn btn btn-primary">
              Join
            </button>
          </div>
        </form>
        </>
      ) : (
        <>
          <Chat />
        </>
      )}
    </div>
  );
};

export default Room;
