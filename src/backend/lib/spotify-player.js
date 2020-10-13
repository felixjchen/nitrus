"use strict";
exports.__esModule = true;
exports.roomStart = exports.playerPause = exports.playerStart = void 0;
// https://github.com/felixjchen/spotify-together/issues/2
// for user id, play track with trackID, starting at position_ms
var playerStart = function (id, trackId, position_ms) {
    //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
};
exports.playerStart = playerStart;
// for userid, pause player
var playerPause = function (id) {
    // https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
};
exports.playerPause = playerPause;
// for entire room, play track with trackID, starting at position_ms
var roomStart = function (room, trackId, position_ms) {
    //https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
};
exports.roomStart = roomStart;
