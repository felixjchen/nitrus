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

  return responseJSON.devices;
};

// for user with access_token, play track with track_uri, starting at position_ms
const playerStart = async (access_token, track_uri, position_ms) => {
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
  if (devices) {
    let device_id = devices[0].id;

    let response = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
      requestOptions
    );

    return 1;
  } else {
    return -1;
  }
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
  for (let k in users) {
    let { access_token } = users[k];
    playerStart(access_token, track_uri, position_ms);
  }
};

export { playerStart, playerPause, roomStart };

// playerStart(
//   "BQB_swOfcX4Kee0zxkVaVu5DWKqpKouQvAOW2faXzjrBa7e4zNua-B99kBKYzsXGlW3YJ8jyrjOKirEX79IYjvC75ixazS1yLFXQ1Ebg_i2-RgfFOTrm5MQhDwUJCkhwIguC3qvO2T7FGjTFaPacaK1a9kr0YABPysV9WVwGsA",
//   "spotify:track:1DMEzmAoQIikcL52psptQL",
//   0
// );
