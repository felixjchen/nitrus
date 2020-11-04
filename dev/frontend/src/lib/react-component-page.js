import React, { useState, useEffect } from "react";
import SearchPane from "./react-component-search";
import ProfileImages from "./react-component-profile-images";
import Debug from "./react-component-debug";
import Queue from "./react-component-queue";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Grid,
  Row,
  Column,
} from "carbon-components-react";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { Logout20 } from "@carbon/icons-react";
import styles from "./react-component-page.css";
import io from "socket.io-client";

const urlSearchParams = new URLSearchParams(window.location.search);
const spotifyID = urlSearchParams.get("spotifyID");
// const backendURL = "http://0.0.0.0";
const backendURL = "https://nitrus.azurewebsites.net";

const socket = io(backendURL);
socket.on("connect", () => {
  socket.emit("init", spotifyID);
});
socket.on("redirectToLogin", () => {
  window.location.replace(`${backendURL}/login`);
});

const bottomSheetProps = {
  overflowHeight: 52,
  shadowTip: false,
  topShadow: false,
  overlay: false,
  scrollTopAtClose: true,
};

const spotifyLogoutHandler = () => {
  window.location.replace("https://www.spotify.com/logout/");
};

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const Page = () => {
  return (
    <div id="page">
      <HeaderContainer
        render={() => (
          <>
            <Header aria-label="Nitrus">
              <HeaderName prefix="">Nitrus</HeaderName>
              <HeaderNavigation aria-label="Nitrus">
                <>
                  <ProfileImages socket={socket}></ProfileImages>
                </>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  id="logoutIcon"
                  aria-label="Logout"
                  onClick={spotifyLogoutHandler}
                >
                  <Logout20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
            <Grid condensed>
              <Row>
                <Column sm={{ span: 0 }} md={2} lg={2}>
                  <div id="DesktopQueueWrapper">
                    <Queue socket={socket} spotifyID={spotifyID}></Queue>
                  </div>
                </Column>
                <Column sm={4} md={6} lg={10}>
                  <SearchPane
                    socket={socket}
                    spotifyID={spotifyID}
                  ></SearchPane>
                </Column>

                <Column sm={1} md={{ span: 0 }} lg={{ span: 0 }}>
                  <SwipeableBottomSheet {...bottomSheetProps}>
                    <div id="MobileQueueWrapper">
                      <Queue socket={socket} spotifyID={spotifyID}></Queue>
                    </div>
                  </SwipeableBottomSheet>
                </Column>
              </Row>

              {/* DEBUG */}
              <Row>
                <>
                  <Column>{/* <Debug socket={socket}></Debug> */}</Column>
                </>
              </Row>
            </Grid>
          </>
        )}
      />
    </div>
  );
};
export default Page;
