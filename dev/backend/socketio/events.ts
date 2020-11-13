import { room, io } from "../global";
import { refreshTimeout, playTimeout } from "./timeouts";
import {
  getSimplifiedRoom,
  broadcastCurrentlyPlaying,
  broadcastUsers,
  broadcastQueue,
  setUsers,
  setCurrentlyPlaying,
  setQueue,
} from "./helpers";
import { joinRoom, pausePlayer } from "../spotify/player";

const createSocketIOEvents = () => {
  io.on("connect", (socket) => {
    let socketID = socket.id;

    socket.on("init", (spotifyID) => {
      // User not logged into backend..
      if (!room.users[spotifyID]) {
        socket.emit("redirectToLogin");
        return;
      }

      socket.join("room0");
      room.users[spotifyID].socketID = socketID;

      // We update entire room about new user
      broadcastUsers();

      // We update new user about the queue
      setQueue(socket);
      setCurrentlyPlaying(socket);
      joinRoom(spotifyID);

      // Send client their access token and start refresh token timeout
      refreshTimeout(spotifyID, socket);
    });

    socket.on("addTrackToQueue", ({ spotifyID, track }) => {
      console.log(`${spotifyID} has added ${track.name} to queue`);

      const queueTrack = {
        track,
        votes: {},
        priority: 1,
      };
      queueTrack.votes[spotifyID] = 1;
      //  Add track to queue and sort by prio
      room.queue.push(queueTrack);
      room.queue.sort((a, b) => b.priority - a.priority);

      // If nothing is playing.. play
      if (room.currently_playing === null) {
        playTimeout();
      }

      // Update all clients with current queue
      broadcastQueue();
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

      broadcastQueue();
    });

    socket.on("disconnect", async () => {
      //  MORE work here for queue... we need to remove votes
      let spotifyID = "";
      for (let userID in room.users) {
        let user = room.users[userID];
        if (user.socketID == socketID) {
          spotifyID = userID;
          break;
        }
      }

      // We update entire room about disconnect user
      if (spotifyID !== "") {
        broadcastUsers();
        await pausePlayer(spotifyID);

        let user = room.users[spotifyID];
        clearTimeout(user.refreshTimeout);
        console.log(
          user.display_name,
          "has disconnected, with spotifyID",
          spotifyID
        );
        delete room.users[spotifyID];
      }
    });
  });
};

export { createSocketIOEvents };
