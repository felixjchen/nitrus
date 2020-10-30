import * as socketio from "socket.io";
import { room } from "./global";
import {
  getSimplifiedRoom,
  setAccessTokenFromRefreshToken,
} from "./socketio-helpers";

const initSocketIO = (httpServer) => {
  const io = socketio(httpServer);

  const updateQueue = () => {
    let queue = room.queue;
    io.to("room0").emit("setQueue", queue);
  };
  const updateUsers = () => {
    // We update entire room
    let users = getSimplifiedRoom().users;
    io.to("room0").emit("setUsers", users);
  };

  io.on("connect", (socket) => {
    let clientSocketID = socket.id;

    socket.on("init", (clientSpotifyID) => {
      // User not logged into backend..
      if (!room.users[clientSpotifyID]) {
        socket.emit("redirectToLogin");
        return;
      }

      socket.join("room0");
      room.users[clientSpotifyID].clientSocketID = clientSocketID;

      // We update entire room about new user
      updateUsers();

      // Send client their access token and start refresh token timeout
      setAccessTokenFromRefreshToken(clientSpotifyID, socket);
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
      updateUsers();
    });

    socket.on("addToQueue", ({ spotifyID, context_uri }) => {
      console.log({ spotifyID, context_uri });

      updateQueue();
    });
  });

  return io;
};

export { initSocketIO };
