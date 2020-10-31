import * as socketio from "socket.io";
import { room } from "./global";
import {
  getSimplifiedRoom,
  setAccessTokenFromRefreshToken,
} from "./socketio-helpers";

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

      updateQueue();
    });

    socket.on("voteTrack", ({ spotifyID, vote, trackID }) => {
      let i = 0;
      let found = false;
      while (room.queue[i].track.id !== trackID) {
        i++;
        found = true;
      }

      // a user can spam downvote... entry dissapears and then array out of bounds when looking for it
      if (!found) return;

      let queueTrack = room.queue[i];
      queueTrack.votes[spotifyID] = vote;
      queueTrack.priority += vote;

      if (queueTrack.priority === 0) delete room.queue[i];
      room.queue.sort((a, b) => b.priority - a.priority);

      console.log(room.queue);

      updateQueue();
    });
  });

  return io;
};

export { initSocketIO };
