import * as fetch from "node-fetch";

// https://github.com/felixjchen/spotify-together/issues/2

// for user id, play track with trackID, starting at position_ms
const playerStart = (id, trackId, position_ms) => {
  //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
};
// for userid, pause player
const playerPause = (id) => {
  // https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
};

// for entire room, play track with trackID, starting at position_ms
const roomStart = (room, trackId, position_ms) => {
  //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
};

export { playerStart, playerPause, roomStart };
