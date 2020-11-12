import React, { useState, useEffect } from "react";
import styles from "./profile-images.css";

const ProfileImages = (props) => {
  const socket = props.socket;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("setUsers", (users) => {
      setUsers(users);
    });
    return () => {};
  });

  const profileImages = [];
  for (let userID in users) {
    profileImages.push(
      <img
        key={`${userID}_profilePhoto`}
        src={users[userID].profileImageURL}
      ></img>
    );
  }

  return profileImages;
};

export default ProfileImages;
