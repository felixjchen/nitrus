import React from "react";
// import { render } from "react-dom";
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
import { SearchPane } from "./search";
import styles from "./page.css";

const bottomSheetProps = {
  overflowHeight: 48,
  shadowTip: false,
  topShadow: false,
  overlay: false,
  scrollTopAtClose: true,
};

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  spotifyLogout = () => {
    window.location.replace("https://www.spotify.com/logout/");
  };

  render() {
    const profileImages = [];
    for (let userID in this.props.room.users) {
      profileImages.push(
        <img
          key={`${userID}_profilePhoto`}
          className="profilePhoto"
          src={this.props.room.users[userID].profileImageURL}
        ></img>
      );
    }
    return (
      <div id="page">
        <HeaderContainer
          render={() => (
            <>
              <Header aria-label="Nitrus">
                <HeaderName prefix="">Nitrus</HeaderName>
                <HeaderNavigation aria-label="Nitrus">
                  {profileImages}
                </HeaderNavigation>
                <HeaderGlobalBar>
                  <HeaderGlobalAction
                    id="logoutIcon"
                    aria-label="Logout"
                    onClick={this.spotifyLogout}
                  >
                    <Logout20 />
                  </HeaderGlobalAction>
                </HeaderGlobalBar>
              </Header>
              <Grid>
                <Row>
                  <Column id="DesktopQueue" sm={{ span: 0 }} md={2} lg={3}>
                    Queue
                  </Column>
                  <Column sm={4} md={6} lg={9}>
                    <SearchPane
                      access_token={this.props.access_token}
                    ></SearchPane>
                  </Column>

                  <Column sm={1} md={{ span: 0 }} lg={{ span: 0 }}>
                    <SwipeableBottomSheet {...bottomSheetProps}>
                      <div id="MobileQueue"></div>
                    </SwipeableBottomSheet>
                  </Column>
                </Row>
              </Grid>
            </>
          )}
        />
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    );
  }
}
export default Page;
