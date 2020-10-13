import React from "react";
import { render } from "react-dom";
import io from "socket.io-client";
import Page from "./lib/page";

const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");
let access_token = "";

// https://www.npmjs.com/package/socket.io-client
const backendAddress = "http://0.0.0.0";
const socket = io(backendAddress);
socket.on("connect", () => {
  socket.emit("syncReq", id);
});

socket.on("syncRes", (room) => {
  ({ access_token } = room.users[id]);
  console.log(room, access_token);
  render(
    <Page room={room} access_token={access_token} />,
    document.getElementById("root")
  );
});

// render(<Page />, document.getElementById("root"));
