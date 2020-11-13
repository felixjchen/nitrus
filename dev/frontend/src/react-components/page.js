import React from "react";
import SearchPane from "./search";
import ProfileImages from "./profile-images";
import Debug from "./debug";
import Queue from "./queue";
import MobileQueue from "./mobile-queue";
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
import { Logout20 } from "@carbon/icons-react";
import styles from "./page.css";

const spotifyLogoutHandler = () => {
  window.location.replace("https://www.spotify.com/logout/");
};

const Page = (props) => {
  let { socket, spotifyID } = props;

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
                  <MobileQueue
                    socket={socket}
                    spotifyID={spotifyID}
                  ></MobileQueue>
                </Column>
              </Row>

              {/* DEBUG */}
              {/* <Row>
                <>
                  <Column>
                    <Debug socket={socket}></Debug>
                  </Column>
                </>
              </Row> */}
            </Grid>
          </>
        )}
      />
    </div>
  );
};
export default Page;
