import React, { useState, useEffect } from "react";
import styles from "./react-component-debug.css";

const Debug = (props) => {
  const socket = props.socket;
  const [users, setUsers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    socket.on("setUsers", (users) => {
      setUsers(users);
      console.log("New users", users);
    });
    socket.on("setQueue", (queue) => {
      setQueue(queue);
      console.log("New queue", queue);
    });
    socket.on("setAccessToken", (accessToken) => {
      setAccessToken(accessToken);
      console.log("New accessToken", accessToken);
    });
    return () => {};
  });

  return <pre>{JSON.stringify({ users, queue, accessToken }, null, 2)} </pre>;
};

export default Debug;
