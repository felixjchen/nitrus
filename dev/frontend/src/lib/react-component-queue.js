import React, { useState, useEffect } from "react";
import { Grid, Row, Column } from "carbon-components-react";
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

  const QueueTracks = queue.map((i) => {
    return (
      <QueueTrack
        key={`QueueTrack${i.track.id}`}
        spotifyID={spotifyID}
        {...i}
      ></QueueTrack>
    );
  });

  return <Grid>{QueueTracks}</Grid>;
};

const QueueTrack = (props) => {
  const { spotifyID } = props;
  const vote = spotifyID in props.votes ? props.votes[spotifyID] : 0;
  console.log(props, spotifyID, vote);
  return (
    <Row className="queue-track">
      <Column md={2}>
        <img src={`${props.track.album.images[0].url}`}></img>
      </Column>
      <Column md={4}>
        {props.track.name + " - " + props.track.artists[0].name}
      </Column>
      <Column md={2} className="queue-track-vote-col">
        <div>
          <ChevronSortUp32 className={vote === 1 ? "active" : ""} />
        </div>
        <div>{props.priority}</div>
        <div>
          <ChevronSortDown32 className={vote === -1 ? "active" : ""} />
        </div>
      </Column>
    </Row>
  );
};

export default Queue;
