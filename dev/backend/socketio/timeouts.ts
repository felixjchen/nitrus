import * as socketio from "socket.io";
import { room } from "../global";
import { getAccess } from "../spotify/authorization";
import { startRoom } from "../spotify/player";
import { broadcastCurrentlyPlaying, broadcastQueue } from "./helpers";

const refreshTimeout = async (spotifyID: string, socket) => {
  // Fetch from spotify API
  let { refresh_token } = room.users[spotifyID];
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
const playTimeout = async () => {
  if (room.queue.length == 0) {
    room.currently_playing = null;
  } else {
    // Pop top prio
    let queueTrack = room.queue.shift().track;
    room.currently_playing = queueTrack;

    console.log(`Room is now listening to ${queueTrack.name}`);

    startRoom(queueTrack.uri, 0);

    setTimeout(() => playTimeout(), queueTrack.duration_ms);
  }
  broadcastCurrentlyPlaying();
  broadcastQueue();
};
export { refreshTimeout, playTimeout };
