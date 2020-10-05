import * as http from "http";
import * as express from "./node_modules/express";
import * as socketio from "./node_modules/socket.io";
import * as querystring from "querystring";

import { getAccessAndRefresh, getAccess } from "./lib/spotify-authorization";
import { getProfile } from "./lib/spotify-helpers";

import * as secrets from "./secrets.json";
const { client_id, client_secret, redirect_uri } = secrets;

const app = express();
const httpServer = http.createServer(app);
const socket = socketio(httpServer);
const port = 80;

const frontend_url = "http://localhost:3000";

let room = { queue: [], users: {} };

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
      // Need to refresh access token!!!!
      // console.log(await getAccess(refresh_token));

      let profile = await getProfile(access_token);
      profile.profileImageUrl = profile.images[0].url;

      room.users[profile.id] = profile;
      res.redirect(`${frontend_url}?${querystring.stringify(profile)}`);

      console.log(room);
      // res.send(`Hello ${profile.display_name}`);
    }
  }
});

socket.on("connection", (socket) => {
  console.log("A user connected");
});

httpServer.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
