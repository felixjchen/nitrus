import React, { useState, useEffect } from "react";
import Queue from "./react-component-queue";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";

const bottomSheetProps = {
  overflowHeight: 60,
  shadowTip: false,
  topShadow: false,
  overlay: false,
  scrollTopAtClose: true,
};
const MobileQueue = (props) => {
  const { spotifyID, socket } = props;

  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
    >
      <SwipeableBottomSheet {...bottomSheetProps} open={open}>
        <div id="MobileQueueWrapper">
          <Queue socket={socket} spotifyID={spotifyID}></Queue>
        </div>
      </SwipeableBottomSheet>
    </div>
  );
};

export default MobileQueue;
