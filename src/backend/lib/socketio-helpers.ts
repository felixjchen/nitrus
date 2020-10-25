import * as socketio from "socket.io";
import { room } from "../global";

const simplifiedRoomKeys = [
  "display_name",
  "email",
  "href",
  "id",
  "profileImageURL",
];
// For user with clientSpotifyID, get a simplified room
const getSimplifiedRoom = () => {
  let simpleRoom = { queue: room.queue, users: {} };

  for (let userID in room.users) {
    simpleRoom.users[userID] = {};
    let user = room.users[userID];
    // We only keep certain keys for everyone, and we will send every client their spotify access toekn
    for (let key in user) {
      if (simplifiedRoomKeys.includes(key)) {
        simpleRoom.users[userID][key] = user[key];
      }
    }
  }

  return simpleRoom;
};

const getAccessToken = (clientSpotifyID) => {
  if (room.users[clientSpotifyID]) {
    return room.users[clientSpotifyID].access_token;
  } else {
    return undefined;
  }
};
export { getSimplifiedRoom, getAccessToken };
