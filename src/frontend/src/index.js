import React from "react";
import { render } from "react-dom";
import io from "socket.io-client";
import Page from "./lib/page";

// https://www.npmjs.com/package/socket.io-client
const socketServerAddress = "http://0.0.0.0";
const socket = io(socketServerAddress);
socket.on("connect", () => {
  console.log(1);
});

render(<Page />, document.getElementById("root"));
