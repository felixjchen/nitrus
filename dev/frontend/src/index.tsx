import React from "react";
import { render } from "react-dom";
import io from "socket.io-client";
import Page from "./lib/react-component-page";

const urlSearchParams = new URLSearchParams(window.location.search);
const spotifyID = urlSearchParams.get("spotifyID");

// https://www.npmjs.com/package/socket.io-client
const backendURL = "http://0.0.0.0";
// const backendURL = "https://nitrus.azurewebsites.net";
const socket = io(backendURL);

let access_token: string = "";
let room: object = { queue: [], users: {} };
///////////////////////////////////////////////////////////////////////////////////////
// Helpers
///////////////////////////////////////////////////////////////////////////////////////
const setPage = () => {
  let page = <Page {...{ room, access_token, addToQueueHandler }} />;
  render(page, document.getElementById("root"));
};

const addToQueueHandler = (context_uri: string) => {
  console.log({ spotifyID, context_uri });
  socket.emit("addToQueue", { spotifyID, context_uri });
};

///////////////////////////////////////////////////////////////////////////////////////
// Socket events
///////////////////////////////////////////////////////////////////////////////////////
socket.on("connect", () => {
  socket.emit("init", spotifyID);
});

socket.on("redirectToLogin", () => {
  window.location.replace(`${backendURL}/login`);
});

socket.on("setRoom", (simpleRoom: Object) => {
  room = simpleRoom;
  console.log("new room", room);

  setPage();
});

socket.on("setAccessToken", (accessToken: string) => {
  access_token = accessToken;
  console.log("new access token", access_token);

  setPage();
});
