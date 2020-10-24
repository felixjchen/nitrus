import * as socketio from "../node_modules/socket.io";
import { room } from "../global";

const initSocketIO = (httpServer) => {
  const io = socketio(httpServer);

  io.on("connect", (socket) => {
    let clientSocketId = socket.id;

    socket.on("getRoom", (id) => {
      if (room.users[id]) {
        room.users[id].clientSocketId = clientSocketId;
      }
      console.log(room.users[id]);

      let roomRes = { ...room };
      for (let userId in roomRes.users) {
        let user = roomRes.users[userId];
        for (let k in user) {
          if (
            !(
              ["display_name", "email", "href", "id", "profileUrl"].includes(
                k
              ) ||
              (userId == id && k == "access_token")
            )
          ) {
            delete user[k];
          }
        }
      }
      socket.emit("setRoom", roomRes);
    });
  });

  return io;
};

export { initSocketIO };
