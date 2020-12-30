import * as http from "http";
import * as express from "express";
import * as socketio from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer, {
  pingInterval: 60 * 1000,
  pingTimeout: 10000,
});
const port = 80;

const production = process.env.production ? true : false;

let frontend_url = "http://localhost:3000";
let client_id, client_secret, redirect_uri;

if (production) {
  ({ client_id, client_secret, redirect_uri } = process.env);
  frontend_url = "https://nitrus.azurewebsites.net";
} else {
  ({ client_id, client_secret, redirect_uri } = require("./secrets.json"));
}

let room = { queue: [], users: {}, currently_playing: null };
let socketMap = {};
console.log({
  production,
  client_id,
  client_secret,
  redirect_uri,
  frontend_url,
  room,
  socketMap,
});
export {
  app,
  httpServer,
  io,
  port,
  production,
  client_id,
  client_secret,
  redirect_uri,
  frontend_url,
  room,
  socketMap,
};
