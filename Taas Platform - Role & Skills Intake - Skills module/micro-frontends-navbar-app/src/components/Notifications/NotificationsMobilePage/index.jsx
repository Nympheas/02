/**
 * Fullscreen popup which shows notifications in mobile resolution
 */
import React from 'react'
import PropTypes from 'prop-types'
import MobilePage from '../MobilePage'
import NotificationsBell from '../NotificationsBell'
import XMartIcon from '../../../assets/icons/x-mark-white.svg'
import './styles.scss'

const NotificationsDropdown = ({ onToggle, children, hasUnread, isOpen }) => (
  <div styleName="container">
    <NotificationsBell
      hasUnread={hasUnread}
      onClick={onToggle}
    />
    {isOpen && (
      <MobilePage>
        <div styleName="header">
          <div styleName="title">Notifications</div>
          <div styleName="btn" onClick={onToggle}><XMartIcon /></div>
        </div>
        <div styleName="body">
          {children}
        </div>
      </MobilePage>
    )}
  </div>
)

NotificationsDropdown.propTypes = {
  hasUnread: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default NotificationsDropdown
