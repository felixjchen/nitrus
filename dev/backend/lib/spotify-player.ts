import * as fetch from "node-fetch";

// https://github.com/felixjchen/spotify-together/issues/2

// for user with access_token, play track with URI, starting at position_ms
const playerStart = (access_token, URI, position_ms) => {
  //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
  var myHeaders = {"Authorization": "Bearer " + access_token, "Content-Type": "application/json"};

  var raw = JSON.stringify({"uris": [URI],"offset":{"position":0},"position_ms":position_ms});

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://api.spotify.com/v1/me/player/play", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

// for user with access_token, pause player
const playerPause = (access_token) => {
  // https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
  var myHeaders = {"Authorization": "Bearer " + access_token};

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://api.spotify.com/v1/me/player/pause", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

// for each user in room, play top track in room queue, starting at position_ms
const roomStart = (room, position_ms) => {
  //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
  var users = room.users;
  var track = room.queue[0];
  for(var _ in users) {
    var access_token = users.user.accessToken;
    playerStart(access_token, track, position_ms)
  }
};

export { playerStart, playerPause, roomStart };

var my_token = "BQBNXQS6nIdEDvig1g5sbT0ASuYV23h_MegCxIm4Gik-yFb43Lwk-n_PYr3U7QsEFhG-LXM8YR9bAFiDy7GbzB5Sxwg0Q6Wc41YpWVxGalKU8v_ZMlHtYmXGi_n7071isLfHBSwB_-0NL8vBgtc2RnZU"
var uri = "spotify:track:0RC8s8nCsiSmONOLSB78AP"

playerStart(my_token, uri, 0);
setTimeout(() => {  playerPause(my_token); }, 5000);
