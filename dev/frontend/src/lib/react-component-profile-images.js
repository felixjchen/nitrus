import React, { useState, useEffect } from "react";
import styles from "./react-component-profile-images.css";

const ProfileImages = (props) => {
  const socket = props.socket;
  const [users, setUsers] = useState(users);

  useEffect(() => {
    socket.on("setUsers", (users) => {
      setUsers(users);
      console.log("New users", users);
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
