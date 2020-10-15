import * as http from "http";
import * as express from "./node_modules/express";
import * as socketio from "./node_modules/socket.io";
import * as querystring from "querystring";

import { getAccessAndRefresh, getAccess } from "./lib/spotify-authorization";
import { getProfile } from "./lib/spotify-helpers";

import {
  client_id,
  client_secret,
  redirect_uri,
  frontend_url,
} from "./constants";

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);
const port = process.env.PORT || 80;

// Need to cleanup refresh listener on exit
let room = { queue: [], users: {} };

let refresh = async (id, refresh_token) => {
  let { access_token, expires_in } = await getAccess(refresh_token);

  room.users[id].access_token = access_token;
  room.users[id].refreshTimeout = setTimeout(
    () => refresh(id, refresh_token),
    (expires_in - 2) * 1000
  );

  console.log(`Refreshed acces_token for user ${room.users[id].display_name}`);
};

app.get("/logout", (req, res) => {
  res.send("logout");
});

app.get("/", async (req, res) => {
  if (req.query.code == null) {
    // Authenticate
    let scopes = "user-read-email user-modify-playback-state";
    res.redirect(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        client_id +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(redirect_uri)
    );
  } else {
    // Has authenticated
    let {
      access_token,
      refresh_token,
      error,
      expires_in,
    } = await getAccessAndRefresh(req.query.code);

    if (error == "invalid_grant") {
      res.redirect(redirect_uri);
    } else {
      let profile = await getProfile(access_token);
      // profile.profileUrl = profile.images[0].url;
      profile.access_token = access_token;
      room.users[profile.id] = profile;
      room.users[profile.id].refreshTimeout = setTimeout(
        () => refresh(profile.id, refresh_token),
        (expires_in - 2) * 1000
      );
      console.log(`User ${profile.display_name} has authenticated`);

      res.redirect(
        `${frontend_url}?${querystring.stringify({ id: profile.id })}`
      );
    }
  }
});

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
