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
                <HeaderMenuButton
                  aria-label="Open menu"
                  isCollapsible
                  onClick={onClickSideNavExpand}
                  isActive={isSideNavExpanded}
                />
                <HeaderName
                  href="https://github.com/felixjchen/spotify-together"
                  prefix="patlamaya"
                >
                  devam
                </HeaderName>
                <HeaderNavigation aria-label="patlamaya">
                  <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 2</HeaderMenuItem>

                  <HeaderMenu aria-label="Link 3" menuLinkName="Link 3">
                    <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
                  </HeaderMenu>
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
                <SideNav
                  aria-label="Side navigation"
                  isRail
                  expanded={isSideNavExpanded}
                >
                  <SideNavItems>
                    <SideNavMenu renderIcon={Fade16} title="Category title">
                      <SideNavMenuItem
                        aria-current="page"
                        href="javascript:void(0)"
                      >
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="javascript:void(0)">
                        Link
                      </SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavLink
                      aria-current="page"
                      renderIcon={Fade16}
                      href="javascript:void(0)"
                    >
                      Link
                    </SideNavLink>
                    <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                      Link
                    </SideNavLink>
                  </SideNavItems>
                </SideNav>
              </Header>
            </>
          )}
        />
      </div>
    );
  }
}
export default Page;
