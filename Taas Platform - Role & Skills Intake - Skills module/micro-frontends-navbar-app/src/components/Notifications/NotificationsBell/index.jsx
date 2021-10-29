/**
 * Notifications bell icon
 */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Bell from '../../../assets/icons/ui-bell.svg'
import { useSelector } from "react-redux";
import { filterReadNotifications } from '../../../utils/notifications';
import './styles.scss'

const NotificationsBell = ({ onClick, hasUnread }) => {
  const unread = useSelector((state) => {
    return filterReadNotifications(state.notifications.notifications).length
      + filterReadNotifications(state.notifications.communityNotifications).length;
  });

  return (
    <div styleName={cn('container', { 'has-unread': hasUnread })} onClick={onClick} data-count={unread}>
      <Bell />
    </div>
  )
}

NotificationsBell.propTypes = {
  hasUnread: PropTypes.bool,
  onClick: PropTypes.func
}

export default NotificationsBell
