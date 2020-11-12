import * as fetch from "node-fetch";
import { room } from "./global";

//https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/

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

// for user with spotifyID, play track with track_uri, starting at position_ms
const playerStart = async (spotifyID, track_uri, position_ms) => {
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

    return 1;
  } else {
    return -1;
  }
};

// for user with spotifyID, pause player
const playerPause = (spotifyID) => {
  // https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
  let { access_token } = room.users[spotifyID];
  let myHeaders = { Authorization: "Bearer " + access_token };

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://api.spotify.com/v1/me/player/pause", requestOptions);
};

// for each user in room, play track with track_uri, starting at position_ms
const roomStart = (track_uri, position_ms) => {
  //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
  let users = room.users;
  for (let spotifyID in users) {
    playerStart(spotifyID, track_uri, position_ms);
  }
};

export { playerStart, playerPause, roomStart };
