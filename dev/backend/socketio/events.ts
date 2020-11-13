import { room, io } from "../global";
import { refreshTimeout, playTimeout } from "./timeouts";
import { getSimplifiedRoom } from "./helpers";

const updateUsers = () => {
  let { users } = getSimplifiedRoom();
  io.to("room0").emit("setUsers", users);
};
const updateCurrentlyPlaying = () => {
  let { currently_playing } = room;
  io.to("room0").emit("setCurrentlyPlaying", currently_playing);
};
const updateQueue = () => {
  let { queue } = room;
  io.to("room0").emit("setQueue", queue);
};

const createSocketIOEvents = () => {
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

      // These two can be sent to new user only
      updateQueue();
      updateCurrentlyPlaying();

      // Send client their access token and start refresh token timeout
      refreshTimeout(clientSpotifyID, socket);
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
        playTimeout(updateCurrentlyPlaying, updateQueue);
      }

      // Update all clients with current queue
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
  });
};

export { createSocketIOEvents };
