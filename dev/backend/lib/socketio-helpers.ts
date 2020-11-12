import * as socketio from "socket.io";
import { room } from "./global";
import { getAccess } from "./spotify-authorization";
import { roomStart } from "./spotify-player";

const simplifiedRoomKeys = [
  "display_name",
  "email",
  "href",
  "id",
  "profileImageURL",
];

//  get a simplified room
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

const refreshTimeout = async (spotifyID: string, socket) => {
  // Fetch from spotify API
  let refresh_token = room.users[spotifyID].refresh_token;
  let { access_token, expires_in } = await getAccess(refresh_token);

  // Update Room
  room.users[spotifyID].access_token = access_token;
  // Set new timeout
  room.users[spotifyID].refreshTimeout = setTimeout(
    () => refreshTimeout(spotifyID, socket),
    (expires_in - 2) * 1000
  );
  // Update client
  socket.emit("setAccessToken", access_token);

  console.log(`Set new access_token for ${room.users[spotifyID].display_name}`);
};

// This function starts playing the highes prio track from the queue, it sets a timeout to itself after the track ends. If the queue empties, then sets currently_playing to null
const playTimeout = async (
  updateCurrentlyPlaying: () => void,
  updateQueue: () => void
) => {
  if (room.queue.length == 0) {
    room.currently_playing = null;
  } else {
    let queueTrack = room.queue.shift().track;
    room.currently_playing = queueTrack;

    roomStart(queueTrack.uri, 0);

    setTimeout(
      () => playTimeout(updateCurrentlyPlaying, updateQueue),
      queueTrack.duration_ms
    );
  }
  updateCurrentlyPlaying();
  updateQueue();
};
export { getSimplifiedRoom, refreshTimeout, playTimeout };
