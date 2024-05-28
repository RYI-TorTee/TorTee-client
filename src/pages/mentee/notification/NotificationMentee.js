import React from 'react';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import "./Notification.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons'

export default function MenteeNotification() {
    return (
        <div>
            <NavMentee activePage="notification" />
            <div className='notification-container'>
                <div className='notification-list'>
                    <div className='noti-item'><FontAwesomeIcon className='icon-noti' icon={faBell} size='2x' /></div>
                    <div className='noti-item'><FontAwesomeIcon className='icon-noti' icon={faBell} size='2x' /></div>
                    <div className='noti-item'><FontAwesomeIcon className='icon-noti' icon={faBell} size='2x' /></div>
                    <div className='noti-item'><FontAwesomeIcon className='icon-noti' icon={faBell} size='2x' /></div>

                </div>

            </div>
        </div>
    );
}
