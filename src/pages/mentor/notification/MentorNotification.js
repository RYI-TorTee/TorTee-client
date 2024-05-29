import React from 'react'
import NavMentor from '../../../components/Nav-mentor/NavMentor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import './MetorNotification.scss'

export default function MentorNotification() {
    return (
        <div>
            <NavMentor activePage="notification" />
            <div className='notification-container'>
                <div className='notification-list'>
                    <div className='noti-item'><FontAwesomeIcon className='icon-noti' icon={faBell} size='2x' /></div>
                    <div className='noti-item'><FontAwesomeIcon className='icon-noti' icon={faBell} size='2x' /></div>
                    <div className='noti-item'><FontAwesomeIcon className='icon-noti' icon={faBell} size='2x' /></div>
                    <div className='noti-item'><FontAwesomeIcon className='icon-noti' icon={faBell} size='2x' /></div>

                </div>

            </div>
        </div>
    )
}
