import * as fetch from "node-fetch";

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

  return responseJSON;
};

// for user with access_token, play track with track_uri, starting at position_ms
const playerStart = (access_token, track_uri, position_ms) => {
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

getDevices(
  "BQB4hZ5uupjEB0hBzJr5DB48PeAgQ9T0HNp5ewK0gF-356Ah6BhfvWTbHoiYp_WYMG3dxnLDO5eXNMxWAdxsjwYyiczEmJicXlFy6PNcCErH6gBvFjPvMi3sW2hmYkb4vYO-yMmjZKMKSYRu4tbAjSyeLmHCo1WCdzIKFM8fyg"
).then((r) => {
  console.log(r);
});
