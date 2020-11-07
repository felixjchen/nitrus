import React, { useState, useEffect } from "react";
import styles from "./react-component-queue.css";
import { ChevronSortDown32, ChevronSortUp32 } from "@carbon/icons-react";

const Queue = (props) => {
  const { spotifyID, socket } = props;
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    socket.on("setQueue", (queue) => {
      setQueue(queue);
      console.log("New queue", queue);
    });
    return () => {};
  }, [queue]);

  const voteHandler = (vote, trackID) => {
    socket.emit("voteTrack", { spotifyID, vote, trackID });
  };

  const QueueTracks = queue.map((i) => {
    return (
      <QueueTrack
        key={`QueueTrack${i.track.id}`}
        spotifyID={spotifyID}
        voteHandler={voteHandler}
        {...i}
      ></QueueTrack>
    );
  });

  return <div id="Queue">{QueueTracks}</div>;
};

const QueueTrack = (props) => {
  const { spotifyID, voteHandler, track } = props;
  const vote = spotifyID in props.votes ? props.votes[spotifyID] : 0;

  return (
    <div className="queue-track">
      <div md={2}>
        <img src={`${track.albumImageURL}`}></img>
      </div>
      <div md={4}>{track.name + " - " + track.artistName}</div>
      <div md={2} className="queue-track-vote-col">
        <div>
          <ChevronSortUp32
            onClick={() => {
              // If already upvote, we remove vote, and its neutral
              if (vote === 1) {
                voteHandler(0, track.id);
              } else {
                voteHandler(1, track.id);
              }
            }}
            className={vote === 1 ? "active" : ""}
          />
        </div>
        <div>{props.priority}</div>
      </div>
    </div>
  );
};

export default Queue;
