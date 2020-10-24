import * as socketio from "socket.io";
import { room } from "../global";
import { getSimplifiedRoom, getAccessToken } from "./socketio-helpers";

const initSocketIO = (httpServer) => {
  const io = socketio(httpServer);

  io.on("connect", (socket) => {
    let clientSocketID = socket.id;

    socket.on("init", (clientSpotifyID) => {
      socket.join("room0");
      if (room.users[clientSpotifyID]) {
        room.users[clientSpotifyID].clientSocketID = clientSocketID;
      }

      // We update entire room about new user
      let simpleRoom = getSimplifiedRoom();
      io.to("room0").emit("setRoom", simpleRoom);

      // We update new user with their accessToken
      let access_token = getAccessToken(clientSpotifyID);
      socket.emit("setAccessToken", access_token);
    });

    socket.on("disconnect", (reason) => {
      for (let userID in room.users) {
        if (room.users[userID].clientSocketID == clientSocketID) {
          console.log(userID, "has disconnected");
          delete room.users[userID];
          return;
        }
      }
    });
  });

  return io;
};

export { initSocketIO };
