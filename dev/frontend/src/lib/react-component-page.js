import React, { useState, useEffect } from "react";
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
import { SearchPane } from "./react-component-search";
import ProfileImages from "./react-component-profile-images";
import styles from "./react-component-page.css";
import io from "socket.io-client";

const urlSearchParams = new URLSearchParams(window.location.search);
const spotifyID = urlSearchParams.get("spotifyID");
const backendURL = "http://0.0.0.0";
// const backendURL = "https://nitrus.azurewebsites.net";

const socket = io(backendURL);
socket.on("connect", () => {
  socket.emit("init", spotifyID);
});
socket.on("redirectToLogin", () => {
  window.location.replace(`${backendURL}/login`);
});

const bottomSheetProps = {
  overflowHeight: 48,
  shadowTip: false,
  topShadow: false,
  overlay: false,
  scrollTopAtClose: true,
};

const spotifyLogoutHandler = () => {
  window.location.replace("https://www.spotify.com/logout/");
};

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
            <Grid>
              <Row>
                <Column id="DesktopQueue" sm={{ span: 0 }} md={2} lg={2}>
                  {/* <pre>{JSON.stringify({ room, accessToken }, null, 2)}</pre> */}
                </Column>
                <Column sm={4} md={6} lg={10}>
                  <SearchPane socket={socket}></SearchPane>
                </Column>

                <Column sm={1} md={{ span: 0 }} lg={{ span: 0 }}>
                  <SwipeableBottomSheet {...bottomSheetProps}>
                    <div id="MobileQueue">
                      <pre>
                        {/* {JSON.stringify({ room, accessToken }, null, 2)} */}
                      </pre>
                    </div>
                  </SwipeableBottomSheet>
                </Column>
              </Row>
            </Grid>
          </>
        )}
      />
    </div>
  );
};
export default Page;
