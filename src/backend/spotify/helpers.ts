import * as fetch from "node-fetch";
import { room } from "../global";
import { startPlayer, getPlayer } from "./player";

const getProfile = async (access_token) => {
  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    redirect: "follow",
  };
  let response = await fetch("https://api.spotify.com/v1/me", requestOptions);
  return JSON.parse(await response.text());
};

// for each user in roomName, start player
const startRoom = (roomName: string): void => {
  let users = room.users;
  for (let spotifyID in users) {
    let { access_token } = room.users[spotifyID];
    startPlayerForRoom(access_token, roomName);
  }
};

// If there is a currentlyPlaying track and we're not actively listening to it... start it
const joinRoom = async (spotifyID: string, roomName: string) => {
  if (room.currently_playing !== null) {
    let { access_token } = room.users[spotifyID];
    let { currently_playing } = room;
    let player = await getPlayer(access_token);

    // If player not listening to anything or the right thing
    if (
      !player ||
      !player.is_playing ||
      !player.item ||
      !(player.item.id === currently_playing.id)
    ) {
      startPlayerForRoom(access_token, roomName);
    }
  }
};

const startPlayerForRoom = (access_token, roomName) => {
  let { currently_playing } = room;
  let { complete_at, duration_ms } = currently_playing;
  let start_at = duration_ms - (complete_at - Date.now());
  startPlayer(access_token, currently_playing.uri, start_at);
};
export { getProfile, startRoom, joinRoom };
