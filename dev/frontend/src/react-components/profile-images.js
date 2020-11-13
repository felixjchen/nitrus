import React, { useState, useEffect } from "react";
import styles from "./profile-images.css";

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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
    let displayLetters = users[userID].display_name
      ? users[userID].display_name[0]
      : "?";
    let profilePhoto = (
      <div
        className="emptyPhoto"
        key={`${userID}_profilePhoto`}
        style={{
          backgroundColor: getRandomColor(),
        }}
      >
        {displayLetters}
      </div>
    );

    console.log();

    if (users[userID].profileImageURL) {
      profilePhoto = (
        <img
          key={`${userID}_profilePhoto`}
          src={users[userID].profileImageURL}
        ></img>
      );
    }
    profileImages.push(profilePhoto);
  }

  return profileImages;
};

export default ProfileImages;
