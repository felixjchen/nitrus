import * as socketio from "socket.io";
import { room } from "../global";
import {
  getSimplifiedRoom,
  isAuthorized,
  setAccessTokenFromRefreshToken,
} from "./socketio-helpers";

const initSocketIO = (httpServer) => {
  const io = socketio(httpServer);

  const updateRoom = () => {
    // We update entire room
    let simpleRoom = getSimplifiedRoom();
    io.to("room0").emit("setRoom", simpleRoom);
  };

  io.on("connect", (socket) => {
    let clientSocketID = socket.id;

    socket.on("init", (clientSpotifyID) => {
      socket.join("room0");
      if (room.users[clientSpotifyID]) {
        room.users[clientSpotifyID].clientSocketID = clientSocketID;
      }

      // We update entire room about new user
      updateRoom();

      if (!isAuthorized(clientSpotifyID)) {
        socket.emit("redirectToLogin");
      } else {
        // Send client their access token and start refresh token timeout
        setAccessTokenFromRefreshToken(clientSpotifyID, socket);
      }
    });

    socket.on("disconnect", () => {
      for (let userID in room.users) {
        if (room.users[userID].clientSocketID == clientSocketID) {
          clearTimeout(room.users[userID].refreshTimeout);
          console.log(room.users[userID].display_name, "has disconnected");
          delete room.users[userID];
          break;
        }
      }

      // We update entire room about disconnect user
      updateRoom();
    });
  });

  return io;
};

export { initSocketIO };
