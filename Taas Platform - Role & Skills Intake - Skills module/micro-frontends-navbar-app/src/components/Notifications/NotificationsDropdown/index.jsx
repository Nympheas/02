/**
 * Notifications dropdown
 *
 * A bell icon which toggles a dropdown with notifications
 */
import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../../Dropdown/Dropdown'
import NotificationsBell from '../NotificationsBell'

class EnhancedDropdown extends Dropdown {
  constructor(props) {
    super(props)
    this.onClickOutside = this.onClickOutside.bind(this)
  }

  onClickOutside(evt) {
    let currNode = evt.target
    let isDropdown = false

    do {
      if (currNode.className
        && currNode.className.indexOf
        && currNode.className.indexOf('dropdown-wrap') > -1) {
        isDropdown = true
        break
      }

      currNode = currNode.parentNode

      if (!currNode)
        break
    } while (currNode.tagName)

    if (!isDropdown) {
      this.setState({ isOpen: false }, () => {
        this.props.onToggle(false)
        this.refreshEventHandlers()
      })
    }
  }
}

class NotificationsDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(isOpen) {
    if (typeof isOpen === 'object') {
      if (this.props.onToggle) {
        this.props.onToggle(!this.state.isOpen)
      }
      this.setState({ isOpen: !this.state.isOpen})
    } else {
      if (this.props.onToggle) {
        this.props.onToggle(isOpen)
      }
      this.setState({ isOpen })
    }
  }

  render() {
    const { hasUnread, children } = this.props
    return (
      <div className="notifications-dropdown">
        <EnhancedDropdown theme="UserDropdownMenu" pointerShadow noAutoclose onToggle={this.toggle}>
          <div className="dropdown-menu-header">
            <NotificationsBell
              hasUnread={hasUnread}
              onClick={this.toggle}
            />
          </div>
          <div className="dropdown-menu-list">
            <div className="notifications-dropdown-content">
              {children}
            </div>
          </div>
        </EnhancedDropdown>
      </div>
    )
  }
}

NotificationsDropdown.propTypes = {
  hasUnread: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.node
}

export default NotificationsDropdown
