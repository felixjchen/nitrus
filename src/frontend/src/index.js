import React from "react";
import { render } from "react-dom";
import io from "socket.io-client";
import Page from "./lib/page";

const urlSearchParams = new URLSearchParams(window.location.search);
let urlParams = {};
for (let entry of urlSearchParams) {
  const [key, value] = entry;
  urlParams[key] = value;
}
console.log(urlParams);

// https://www.npmjs.com/package/socket.io-client
const backendAddress = "http://0.0.0.0";
const socket = io(backendAddress);
socket.on("connect", () => {
  console.log("Socket connected to server.");
});

render(
  <Page profileUrl={urlParams.profileUrl} />,
  document.getElementById("root")
);
