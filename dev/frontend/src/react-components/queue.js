import React, { useState, useEffect } from "react";
import styles from "./queue.css";
import {
  // ChevronSortDown32,
  ChevronSortUp32,
} from "@carbon/icons-react";

const Queue = (props) => {
  const { spotifyID, socket } = props;
  const [queue, setQueue] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    socket.on("setQueue", (queue) => {
      setQueue(queue);
    });
    socket.on("setCurrentlyPlaying", (currentlyPlaying) => {
      setCurrentlyPlaying(currentlyPlaying);
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

  return (
    <div id="Queue">
      {[
        <CurrentlyPlayingTrack
          key={`currentlyPlaying`}
          track={currentlyPlaying}
        ></CurrentlyPlayingTrack>,
        ...QueueTracks,
      ]}
    </div>
  );
};

const CurrentlyPlayingTrack = (props) => {
  const { track } = props;
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (track) {
    let pos = track.duration_ms - track.complete_at + time;
    let percent = (pos / track.duration_ms) * 100;
    return (
      <div
        className="currently-playing"
        style={{
          background: `linear-gradient(90deg, #0043ce ${
            percent - 1
          }%, #0f62fe ${percent}%)`,
        }}
      >
        <div>
          <img src={`${track.albumImageURL}`}></img>
        </div>
        <div>{track.name + " - " + track.artistName}</div>
      </div>
    );
  } else {
    return <div className="queue-track"></div>;
  }
};

const QueueTrack = (props) => {
  const { spotifyID, voteHandler, track } = props;
  const vote = spotifyID in props.votes ? props.votes[spotifyID] : 0;

  return (
    <div className="queue-track">
      <div>
        <img src={`${track.albumImageURL}`}></img>
      </div>
      <div>{track.name + " - " + track.artistName}</div>
      <div
        className="queue-track-vote-col"
        onClick={(e) => {
          // If already upvote, we remove vote, and its neutral
          if (vote === 1) {
            voteHandler(0, track.id);
          } else {
            voteHandler(1, track.id);
          }

          e.stopPropagation();
        }}
      >
        <div>
          <ChevronSortUp32 className={vote === 1 ? "active" : ""} />
        </div>
        <div>{props.priority}</div>
      </div>
    </div>
  );
};

export default Queue;
