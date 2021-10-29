/**
 * MainMenu component
 *
 * Show side menu for particular application.
 */
import React, { useState, useCallback, Fragment } from "react";
import Menu from "../Menu";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";
import "./styles.css";
import closeIcon from "../../assets/images/close.svg";
import hamburgerIcon from "../../assets/images/hamburger.svg";

const MainMenu = ({ app, sidebarCollapsed, toggleSidebar }) => {
  // Main menu open state
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const isMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  const toggleMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu, setIsOpenMenu]);

  return (
    <div className={cn("main-menu", {
      "main-menu-collapsed": sidebarCollapsed && !isMobile,
      })}>
      {isMobile ? (
        <Fragment>
        <div className="main-menu-header">
          <div
            className={cn("main-menu-title", {
              "main-menu-title-up": isOpenMenu,
            })}
            onClick={toggleMenu}
            role="button"
            tabIndex="0"
          >
            {app.title}
          </div>
        </div>
        {
          isOpenMenu ? (
            <Fragment>
              <div className="main-menu-mobile">
                <Menu sidebarCollapsed={sidebarCollapsed} options={app.menu} />
              </div>
            </Fragment>
          ) : <Fragment></Fragment>
        }
        </Fragment>
      ) : (
        <Fragment>
          <div className="main-menu-header">
            {sidebarCollapsed ? 
              <img
                src={hamburgerIcon}
                onClick={toggleSidebar}
                alt="Hamburger Toggle Icon"
                className="menu-toggle-icon hamburger-icon"
              />
              :
              <img
                src={closeIcon}
                onClick={toggleSidebar}
                alt="Close Icon"
                className="menu-toggle-icon close-icon"
              />
            }
          </div>
          <Menu sidebarCollapsed={sidebarCollapsed} options={app.menu} />
        </Fragment>
      )}
    </div>
  );
};

export default MainMenu;
