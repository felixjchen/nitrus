import React, { useState, useEffect } from "react";
import { Grid, Row, Column } from "carbon-components-react";

const Queue = (props) => {
  const socket = props.socket;

  const [queue, setQueue] = useState([]);

  useEffect(() => {
    socket.on("setQueue", (queue) => {
      setQueue(queue);
      console.log("New queue", queue);
    });
    return () => {};
  });

  const QueueTracks = queue.map((i) => {
    return <QueueTrack key={`QueueTrack${i.track.id}`} {...i}></QueueTrack>;
  });

  return (
    <>
      <Grid>{QueueTracks}</Grid>
    </>
  );
};

const QueueTrack = (props) => {
  console.log(props);
  return (
    <Row>
      <Column md={2}>
        <img src={`${props.track.album.images[0].url}`}></img>
      </Column>
      <Column md={4}>
        {props.track.name + " - " + props.track.artists[0].name}
      </Column>
      <Column md={2}>{props.priority}</Column>
    </Row>
  );
};

export default Queue;
