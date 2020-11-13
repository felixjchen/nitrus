import * as fetch from "node-fetch";
import { room } from "../global";

// Return all available devices
const getDevices = async (access_token) => {
  let requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
    redirect: "follow",
  };

  let response = await fetch(
    "https://api.spotify.com/v1/me/player/devices",
    requestOptions
  );
  let responseText = await response.text();
  let responseJSON = JSON.parse(responseText);

  return responseJSON.devices;
};

// Return player
const getPlayer = async (access_token) => {
  let requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
    redirect: "follow",
  };

  let response = await fetch(
    "https://api.spotify.com/v1/me/player",
    requestOptions
  );
  let responseText = await response.text();
  let responseJSON = responseText ? JSON.parse(responseText) : {};

  return responseJSON;
};

// for user with spotifyID, play track with track_uri, starting at position_ms
const startPlayer = async (spotifyID, track_uri, position_ms) => {
  let { access_token } = room.users[spotifyID];
  let myHeaders = {
    Authorization: "Bearer " + access_token,
    "Content-Type": "application/json",
  };

  let raw = JSON.stringify({
    uris: [track_uri],
    offset: { position: 0 },
    position_ms: position_ms,
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let devices = await getDevices(access_token);
  if (devices.length > 0) {
    let device_id = devices[0].id;

    // Queue on first device
    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
      requestOptions
    );
  }
};

// for user with spotifyID, pause player
const pausePlayer = async (spotifyID) => {
  // https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
  let { access_token } = room.users[spotifyID];
  let myHeaders = { Authorization: "Bearer " + access_token };

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch("https://api.spotify.com/v1/me/player/pause", requestOptions);
};

// for each user in room, play track with track_uri, starting at position_ms
const startRoom = (track_uri, position_ms) => {
  //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
  let users = room.users;
  for (let spotifyID in users) {
    startPlayer(spotifyID, track_uri, position_ms);
  }
};

// If there is a currentlyPlaying track and we're not actively listening to it... start it
const joinRoom = async (spotifyID) => {
  if (room.currently_playing !== null) {
    let { currently_playing } = room;
    let { access_token } = room.users[spotifyID];
    let player = await getPlayer(access_token);

    // If im not listening to anything
    if (
      !player ||
      !player.item ||
      !player.item.is_playing ||
      !(player.item.id === currently_playing.id)
    ) {
      startPlayer(spotifyID, currently_playing.uri, 0);
    }
  }
};
export { startPlayer, pausePlayer, startRoom, joinRoom };
