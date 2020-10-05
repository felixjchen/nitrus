import React from "react";
// import { render } from "react-dom";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuButton,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavMenuItem,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
} from "carbon-components-react";
import { Fade16 } from "@carbon/icons-react";
import { Logout20 } from "@carbon/icons-react";
import styles from "./page.css";

class Page extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div id="page">
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="patlamaya">
                <HeaderName
                  href="https://github.com/felixjchen/spotify-together"
                  prefix="patlamaya"
                >
                  devam
                </HeaderName>
                <HeaderNavigation aria-label="patlamaya">
                  <img src={this.props.profileUrl}></img>
                </HeaderNavigation>
                <HeaderGlobalBar>
                  <HeaderGlobalAction
                    id="logoutIcon"
                    aria-label="Logout"
                    onClick={() => {
                      console.log("logout button clicked");
                    }}
                  >
                    <Logout20 />
                  </HeaderGlobalAction>
                </HeaderGlobalBar>
              </Header>
            </>
          )}
        />
      </div>
    );
  }
}
export default Page;
