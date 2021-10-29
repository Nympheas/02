/**
 * AllAppsMenu component
 *
 * Shows dropdown with applications.
 */
import React, { Fragment, useCallback, useState } from "react";
import { Link } from "@reach/router";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import AllAppsMenuIcon from "../../assets/images/all-apps-menu.svg";
import "./styles.css";
import { useSelector } from "react-redux";

const AllAppsMenu = () => {
  const menu = useSelector((state) => state.menu.categories);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpenMenu(false);
  }, [setIsOpenMenu]);

  const toggleMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu, setIsOpenMenu]);

  return (
    <OutsideClickHandler onOutsideClick={closeMenu}>
      <div className="all-apps-menu">
        <div
          className={cn("all-apps-menu-handler", {
            "all-apps-menu-handler-active": isOpenMenu,
          })}
          onClick={toggleMenu}
          role="button"
          tabIndex="0"
        >
          <img src={AllAppsMenuIcon} alt="All Apps Icon" />
        </div>

        {isOpenMenu && (
          <div className="all-apps-menu-popover">
            <div className="all-apps-menu-popover-content">
              <div className="all-apps-menu-list-title">SWITCH TOOLS</div>
              <ul className="all-apps-menu-list">
                {menu.map((appCategory) => (
                  <Fragment>
                    <div className="switch-category-title">
                      <div className="menu-divider"></div>
                      <div className="all-apps-menu-category-name">{appCategory.category}</div>
                      <div className="menu-divider"></div>
                    </div>
                    {appCategory.apps.map((app) => (
                      <li className="all-apps-menu-app" key={app.path}>
                        <Link to={app.path} onClick={(e) => closeMenu(e, app)}>
                          <img src={app.icon} alt={`${app.title} Icon`} />
                          <span>{app.title}</span>
                        </Link>
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default AllAppsMenu;
