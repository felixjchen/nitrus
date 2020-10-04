import React from "react";
import { render } from "react-dom";
// https://www.npmjs.com/package/socket.io-client
import io from "socket.io-client";

import Page from "./components/page";
const socketEndpoint = "http://0.0.0.0";
const socket = io(socketEndpoint);

socket.on("connect", () => {
  console.log(1);
});

render(<Page />, document.getElementById("root"));
