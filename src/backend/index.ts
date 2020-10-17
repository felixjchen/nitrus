import * as http from "http";
import * as express from "./node_modules/express";
import * as socketio from "./node_modules/socket.io";
import * as path from "path";

import { room } from "./global";
import { rootRouter } from "./routes/root";

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);
const port = process.env.PORT || 80;

app.use("/static", express.static(path.resolve(`${__dirname}/build/static/`)));
app.use("/", rootRouter);

io.on("connect", (socket) => {
  let clientSocketId = socket.id;

  socket.on("syncReq", (id) => {
    if (room.users[id]) {
      room.users[id].clientSocketId = clientSocketId;
    }

    let roomRes = { ...room };
    for (let userId in roomRes.users) {
      let user = roomRes.users[userId];
      for (let k in user) {
        if (
          !(
            ["display_name", "email", "href", "id", "profileUrl"].includes(k) ||
            (userId == id && k == "access_token")
          )
        ) {
          delete user[k];
        }
      }
    }
    socket.emit("syncRes", roomRes);
  });
});

httpServer.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
