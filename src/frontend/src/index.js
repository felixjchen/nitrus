import React from "react";
import { render } from "react-dom";
// https://www.npmjs.com/package/socket.io-client
import io from "socket.io-client";

import Page from "./components/page";
const ENDPOINT = "http://0.0.0.0";

const socket = io(ENDPOINT);
socket.on("connect", () => {
  console.log(1);
});

render(<Page />, document.getElementById("root"));
