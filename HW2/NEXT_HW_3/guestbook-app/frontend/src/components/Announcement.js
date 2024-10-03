import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import '../styles/Announcement.css';

const Announcement = ({ pinnedMessage }) => {
    if (!pinnedMessage) return null;

    return (
        <div className="pinned-message">
            <FontAwesomeIcon icon={faBullhorn} className="pinned-icon" />
            <span className="pinned-text">{pinnedMessage.message}</span>
        </div>
    );
};

export default Announcement;
