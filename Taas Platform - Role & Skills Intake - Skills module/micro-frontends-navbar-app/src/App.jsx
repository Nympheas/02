/**
 * Main App component
 */
import React, { useState, useCallback, useMemo, useEffect } from "react";
import _ from "lodash";
import MainMenu from "./components/MainMenu";
import NavBar from "./components/NavBar";
import { Router } from "@reach/router";
import { useSelector } from "react-redux";
import useMatchSomeRoute from "./hooks/useMatchSomeRoute";
import NotificationsModal from './components/NotificationsModal'
import "./styles/main.module.scss";

const App = () => {
  // all menu options
  const menu = useSelector((state) => state.menu.categories);
  // flat list of all apps (only updated when menu updated in the Redux store)
  const apps = useMemo(() => _.flatMap(menu, "apps"), [menu]);
  // list of routes where we have to disabled sidebar
  const disabledRoutes = useSelector((state) => state.menu.disabledRoutes);
  // `true` is sidebar has to be disabled for the current route
  const isSideBarDisabled = useMatchSomeRoute(disabledRoutes);
  // Left sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Toggle left sidebar callback
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed);
  }, [sidebarCollapsed, setSidebarCollapsed]);
  const isNotificationsEmpty = useSelector((state) =>
    state.notifications.isLoading ||
    state.notifications.isCommunityLoading ||
    !state.notifications.initialized && !state.notifications.communityInitialized
  );

  // set/remove class for the whole page, to know if sidebar is present or no
  useEffect(() => {
    if (isSideBarDisabled) {
      document.body.classList.add("no-sidebar");
    } else {
      document.body.classList.remove("no-sidebar");
    }
  }, [isSideBarDisabled]);

  return (
    <>
      <NavBar />
      {!isSideBarDisabled && (
        <div className="main-menu-wrapper">
          <Router>
            {apps.map((app) => (
              <MainMenu
                sidebarCollapsed={sidebarCollapsed}
                toggleSidebar={toggleSidebar}
                key={app.path}
                path={app.path + "/*"}
                app={app}
              />
            ))}
          </Router>
        </div>
      )}
      <Router>
        <NotificationsModal
          path="notifications"
          isEmpty={isNotificationsEmpty}
        />
      </Router>
    </>
  );
};

export default App;
