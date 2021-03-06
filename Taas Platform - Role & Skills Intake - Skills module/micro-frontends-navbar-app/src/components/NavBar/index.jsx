/**
 * NavBar component.
 *
 * Shows global top navigation bar with all apps menu, logo and user menu.
 */
import React, {useState, useCallback, Fragment, useEffect, useMemo} from "react";
import _ from 'lodash';
import UserMenu from "../UserMenu";
import AllAppsMenu from "../AllAppsMenu";
import { useSelector } from "react-redux";
import { Link, useLocation } from "@reach/router";
import TCLogo from "../../assets/images/tc-logo.svg";
import { getLoginUrl } from "../../utils";
import "./styles.css";
import { useMediaQuery } from "react-responsive";
import NotificationsMenu from "../NotificationsMenu";

const NavBar = () => {
  // all menu options
  const menu = useSelector((state) => state.menu.categories);
  // flat list of all apps
  const apps = useMemo(() => _.flatMap(menu, "apps"), [menu]);
  // Active app
  const [activeApp, setActiveApp] = useState(null);
  const auth = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  const routerLocation = useLocation();
  // Check app title with route activated
  useEffect(() => {
    const activeApp = apps.find(f => routerLocation.pathname.indexOf(f.path) !== -1);
    setActiveApp(activeApp);
  }, [routerLocation])

  // Change micro-app callback
  const changeApp = useCallback((app) => {
    setActiveApp(app);
  }, [setActiveApp]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        {isMobile ?
          (
          <AllAppsMenu/>
          )
          :
          (
          <Fragment>
            <Link to="/">
              <img src={TCLogo} alt="Topcoder Logo" />
            </Link>
            <div className="navbar-divider"></div>
            <div className="navbar-app-title">{activeApp ? activeApp.title : ''}</div>
          </Fragment>
          )
        }

      </div>

      <div className="navbar-center">
        {isMobile ? (
          <Link to="/">
            <img src={TCLogo} alt="Topcoder Logo" />
          </Link>
        ) : (<Fragment></Fragment>)}
        {process.env.NODE_ENV === 'test' && <h3 style={{display: 'none'}}>Navbar App Test</h3>}
      </div>

      <div className="navbar-right">
        {isMobile ? (
          <Fragment>
            {auth.isInitialized &&
              (auth.tokenV3 ? (
                auth.profile && (
                  <Fragment>
                    <NotificationsMenu />
                    <UserMenu profile={auth.profile} />
                  </Fragment>
                )
              ) : (
                <a href={getLoginUrl()} className="navbar-login">
                  Login
                </a>
              ))}
          </Fragment>
        ) : (
          <Fragment>
            <AllAppsMenu appChange={changeApp} />
            <div className="navbar-divider"></div>
            {auth.isInitialized &&
              (auth.tokenV3 ? (
                auth.profile && (
                  <Fragment>
                    <NotificationsMenu />
                    <UserMenu profile={auth.profile} />
                  </Fragment>
                )
              ) : (
                <a href={getLoginUrl()} className="navbar-login">
                  Login
                </a>
              ))}
          </Fragment>
        )}

      </div>
    </div>
  );
};

export default NavBar;
