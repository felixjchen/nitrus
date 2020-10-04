import * as http from "http";
import * as express from "./node_modules/express";
import * as socketio from "./node_modules/socket.io";
import * as querystring from "querystring";

import { getAccessAndRefresh } from "./lib/spotify-authorization";
import { getProfile } from "./lib/spotify-helpers";

import * as secrets from "./secrets.json";
const { client_id, client_secret, redirect_uri } = secrets;

const app = express();
const httpServer = http.createServer(app);
const socket = socketio(httpServer);
const port = 80;

const frontend_url = "http://localhost:3000";

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
    let { access_token, refresh_token, error } = await getAccessAndRefresh(
      req.query.code
    );

    if (error == "invalid_grant") {
      res.redirect(redirect_uri);
    } else {
      console.log(access_token, refresh_token);
      let { display_name } = await getProfile(access_token);

      console.log(querystring.stringify(req.query));

      // res.redirect(frontend_url);
      res.send(`Hello ${display_name}`);
    }
  }
});

socket.on("connection", (socket) => {
  console.log("a user connected");
});

httpServer.listen(port, () => {
  console.log(`listening on *: ${port}`);
});
