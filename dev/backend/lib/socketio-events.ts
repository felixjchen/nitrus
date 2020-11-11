import * as socketio from "socket.io";
import { room } from "./global";
import {
  getSimplifiedRoom,
  setAccessTokenFromRefreshToken,
} from "./socketio-helpers";

import { roomStart } from "./spotify-player";

const initSocketIO = (httpServer) => {
  const io = socketio(httpServer);

  // We update entire room
  const updateQueue = () => {
    let queue = room.queue;
    io.to("room0").emit("setQueue", queue);
  };
  const updateUsers = () => {
    let users = getSimplifiedRoom().users;
    io.to("room0").emit("setUsers", users);
  };

  io.on("connect", (socket) => {
    let clientSocketID = socket.id;

    socket.on("init", (clientSpotifyID) => {
      // User not logged into backend..
      if (!room.users[clientSpotifyID]) {
        socket.emit("redirectToLogin");
        return;
      }

      socket.join("room0");
      room.users[clientSpotifyID].clientSocketID = clientSocketID;

      // We update entire room about new user
      updateUsers();
      updateQueue();

      // Send client their access token and start refresh token timeout
      setAccessTokenFromRefreshToken(clientSpotifyID, socket);
    });

    socket.on("disconnect", () => {
      //  MORE work here for queue... we need to remove votes
      let clientSpotifyID = "";
      for (let userID in room.users) {
        let user = room.users[userID];
        if (user.clientSocketID == clientSocketID) {
          clientSpotifyID = userID;
          clearTimeout(user.refreshTimeout);
          console.log(
            user.display_name,
            "has disconnected, with spotifyID",
            clientSpotifyID
          );
          delete room.users[userID];
          break;
        }
      }

      // We update entire room about disconnect user
      updateUsers();
    });

    socket.on("addTrackToQueue", ({ spotifyID, track }) => {
      console.log(`${spotifyID} has added ${track.name} to queue`);

      const queueTrack = {
        track,
        votes: {},
        priority: 1,
      };
      queueTrack.votes[spotifyID] = 1;
      room.queue.push(queueTrack);
      room.queue.sort((a, b) => b.priority - a.priority);

      roomStart(room, track.uri, 0);

      updateQueue();
    });

    socket.on("voteTrack", ({ spotifyID, vote, trackID }) => {
      for (let i = 0; i < room.queue.length; i++) {
        let queueTrack = room.queue[i];
        // if the vote is for this track.
        if (queueTrack.track.id === trackID) {
          queueTrack.votes[spotifyID] = vote;

          // calculate new priority
          let newPriority = 0;
          for (let spotifyID in queueTrack.votes) {
            newPriority += queueTrack.votes[spotifyID];
          }
          queueTrack.priority = newPriority;
        }
      }

      // Remove all 0 votes
      room.queue = room.queue.filter((i) => i.priority > 0);
      // sort by highest prio first
      room.queue.sort((a, b) => b.priority - a.priority);

      updateQueue();
    });
  });

  return io;
};

export { initSocketIO };
