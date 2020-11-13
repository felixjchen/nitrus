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
    // let displayLetters = users[userID].display_name
    //   ? users[userID].display_name[0]
    //   : "?";
    let profilePhoto;

    if (users[userID].profileImageURL) {
      profilePhoto = (
        <div
          key={`${userID}_profilePhoto`}
          className="profilePhoto"
          style={{
            backgroundImage: `url(${users[userID].profileImageURL})`,
          }}
        >
          {/* {displayLetters} */}
        </div>
      );
    }
    profileImages.push(profilePhoto);
  }

  return <div id="ProfileImages"> {profileImages} </div>;
};

export default ProfileImages;
