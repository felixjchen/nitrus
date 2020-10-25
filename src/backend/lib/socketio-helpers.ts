import * as socketio from "socket.io";
import { room } from "../global";
import { getAccess } from "./spotify-authorization";

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

const setAccessTokenFromRefreshToken = async (spotifyID: string, socket) => {
  // Fetch from spotify API
  let refresh_token = room.users[spotifyID].refresh_token;
  let { access_token, expires_in } = await getAccess(refresh_token);

  // Update Room
  room.users[spotifyID].access_token = access_token;
  // Set new timeout
  room.users[spotifyID].refreshTimeout = setTimeout(
    () => setAccessTokenFromRefreshToken(spotifyID, socket),
    (expires_in - 2) * 1000
  );
  // Update client
  socket.emit("setAccessToken", access_token);

  console.log(`Set new access_token for ${room.users[spotifyID].display_name}`);
};
export { getSimplifiedRoom, setAccessTokenFromRefreshToken };
