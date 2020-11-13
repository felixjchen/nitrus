import * as socketio from "socket.io";
import { room, io } from "../global";

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

const broadcastUsers = (roomName: string) => {
  let { users } = getSimplifiedRoom();
  io.to(roomName).emit("setUsers", users);
};
const broadcastCurrentlyPlaying = (roomName: string) => {
  let { currently_playing } = room;
  io.to(roomName).emit("setCurrentlyPlaying", currently_playing);
};
const broadcastQueue = (roomName: string) => {
  let { queue } = room;
  io.to(roomName).emit("setQueue", queue);
};

const setUsers = (socket) => {
  let { users } = getSimplifiedRoom();
  socket.emit("setUsers", users);
};
const setCurrentlyPlaying = (socket) => {
  let { currently_playing } = room;
  socket.emit("setCurrentlyPlaying", currently_playing);
};
const setQueue = (socket) => {
  let { queue } = room;
  socket.emit("setQueue", queue);
};
export {
  getSimplifiedRoom,
  broadcastCurrentlyPlaying,
  broadcastUsers,
  broadcastQueue,
  setUsers,
  setCurrentlyPlaying,
  setQueue,
};
