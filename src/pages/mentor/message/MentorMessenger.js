import React from 'react';
import "./MentorMessenger.scss"
import NavMentor from '../../../components/Nav-mentor/NavMentor';

export default function MentorMessenger() {
    return (
        <div>
            <NavMentor activePage="messenger" />
            <div className='mentee-messenger-container'>
                <div className='chat-box'>
                    <div className='chat-bar'>
                        <p className='mess-title'>Tin nhắn</p>
                    </div>
                    <div className='mentor-mess'>
                        <div className='mentor-name-mess'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
