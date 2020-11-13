import React from "react";
import { render } from "react-dom";
import Page from "./react-components/page";
import io from "socket.io-client";

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const urlSearchParams = new URLSearchParams(window.location.search);
const spotifyID = urlSearchParams.get("spotifyID");
const production = process.env.NODE_ENV === "production";
const backendURL = production
  ? "https://nitrus.azurewebsites.net"
  : "http://0.0.0.0";

const socket = io(backendURL);

socket.on("connect", () => {
  socket.emit("init", spotifyID);
});
socket.on("redirectToLogin", () => {
  window.location.replace(`${backendURL}/login`);
});

render(
  <Page spotifyID={spotifyID} socket={socket} />,
  document.getElementById("root")
);
