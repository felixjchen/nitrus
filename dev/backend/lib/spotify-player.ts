import * as fetch from "node-fetch";

// https://github.com/felixjchen/spotify-together/issues/2

// for user with access_token, play track with track_uri, starting at position_ms
const playerStart = (access_token, track_uri, position_ms) => {
  //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
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

  fetch("https://api.spotify.com/v1/me/player/play", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// for user with access_token, pause player
const playerPause = (access_token) => {
  // https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
  let myHeaders = { Authorization: "Bearer " + access_token };

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://api.spotify.com/v1/me/player/pause", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// for each user in room, play track with track_uri, starting at position_ms
const roomStart = (room, track_uri, position_ms) => {
  //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
  let users = room.users;
  for (let _ in users) {
    let access_token = users.user.accessToken;
    playerStart(access_token, track_uri, position_ms);
  }
};

export { playerStart, playerPause, roomStart };
