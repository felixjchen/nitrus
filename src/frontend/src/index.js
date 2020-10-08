import React from "react";
import { render } from "react-dom";
import io from "socket.io-client";
import Page from "./lib/page";

const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");

// https://www.npmjs.com/package/socket.io-client
const backendAddress = "http://0.0.0.0";
const socket = io(backendAddress);
socket.on("connect", () => {
  console.log(`Used with id ${id}, socket connected to server.`);
  socket.emit("syncReq", id);
});

socket.on("syncRes", (room) => {
  console.log(room);
  render(<Page room={room} />, document.getElementById("root"));
});

render(<Page />, document.getElementById("root"));
