import * as fetch from "./node_modules/node-fetch";
import * as express from "./node_modules/express";
import * as socketio from "./node_modules/socket.io";
import * as http from "http";
import * as secrets from "./secrets.json";

let { client_id, client_secret } = secrets;

const app = express();
const httpServer = http.createServer(app);
const socket = socketio(httpServer);

const port = 80;

let redirect_uri = "http://localhost:3000/";

const getAccessAndRefresh = async (code) => {
  let raw = {
    grant_type: "authorization_code",
    redirect_uri,
    code,
    client_id,
    client_secret,
  };
  let urlencoded = new URLSearchParams();
  for (let k in raw) {
    urlencoded.append(k, raw[k]);
  }
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: urlencoded,
    redirect: "follow",
  };

  let response = await fetch(
    "https://accounts.spotify.com/api/token",
    requestOptions
  );
  return JSON.parse(await response.text());
};

const getProfile = async (access_token) => {
  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    redirect: "follow",
  };
  let response = await fetch("https://api.spotify.com/v1/me", requestOptions);
  return JSON.parse(await response.text());
};

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
      // console.log(access_token, refresh_token);
      let { display_name } = await getProfile(access_token);

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
