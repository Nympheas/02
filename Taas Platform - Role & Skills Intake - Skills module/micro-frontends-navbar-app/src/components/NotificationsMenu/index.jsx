/**
 * Notification menu component
 *
 * Component to show the bell icon and the notification dropdown
 */

import React, {} from "react";
import "./styles.css";
import NotificationDropdown from '../../containers/NotificationsDropdownContainer'

const NotificationsMenu = () => {
  return (
    <div className="notifications-menu">
      <NotificationDropdown />
    </div>
  );
};

export default NotificationsMenu;
