/**
 * Header for NotificatonsDropdown component
 *
 * Shows title and "Mark all as read" button
 */
import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const NotificationsDropdownHeader = (props) => (
  <div className="notifications-dropdown-header">
    <h3 className="header">Notifications</h3>
    <div className="right-content">
      <button className="tc-btn tc-btn-link mark-all" onClick={props.onMarkAllClick} disabled={!props.hasUnread}>Mark all as read</button>
    </div>
  </div>
)

NotificationsDropdownHeader.propTypes = {
  onMarkAllClick: PropTypes.func.isRequired,
  hasUnread: PropTypes.bool
}

export default NotificationsDropdownHeader
