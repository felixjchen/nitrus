import React, { useState, useEffect } from "react";
import styles from "./debug.css";

const Debug = (props) => {
  const { socket } = props;
  const [users, setUsers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState({});

  useEffect(() => {
    socket.on("setUsers", (users) => {
      setUsers(users);
    });
    socket.on("setQueue", (queue) => {
      setQueue(queue);
    });
    socket.on("setAccessToken", (accessToken) => {
      setAccessToken(accessToken);
    });
    socket.on("setCurrentlyPlaying", (currentlyPlaying) => {
      setCurrentlyPlaying(currentlyPlaying);
    });
    return () => {};
  });

  return (
    <pre>
      {JSON.stringify({ accessToken, currentlyPlaying, queue, users }, null, 2)}{" "}
    </pre>
  );
};

export default Debug;
