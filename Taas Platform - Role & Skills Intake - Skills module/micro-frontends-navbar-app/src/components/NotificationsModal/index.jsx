/**
 * Modal component
 *
 * The component to contain View All Notifications page.
 */
import React from "react";
import { Portal } from 'react-portal'
import { useNavigate } from '@reach/router'
import Notifications from '../../containers/NotificationsContainer'
import XMark from '../../assets/icons/x-mark.svg'
import "./styles.scss";

const NotificationsModal = ({ isEmpty }) => {
  const navigate = useNavigate()

  const close = (
    <button
      key="close"
      styleName="close"
      onClick={() => {
        navigate('/')
      }}
    >
      <XMark styleName="icon-x-mark" />
    </button>
  );

  return (
    <Portal>
      <div id="overlay-main" styleName="main-overlay">
        <div styleName="modal">
          {!isEmpty && close}
          <div styleName="modal-body">
            <Notifications />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default NotificationsModal
