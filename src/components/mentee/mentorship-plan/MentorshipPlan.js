import React, { useEffect, useState } from 'react';
import './MentorshipPlan.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faClock, faComments } from '@fortawesome/free-regular-svg-icons';

const MentorShipPlan = () => {


    return (
        <div className='mentorship-plan-container'>
            <h3>Mentorship Plan</h3>
            <div className='mentorship-plan'>
                <h2>xxx$/month</h2>
                <p>absnsnss</p>
                <div style={{ marginTop: '30px' }}>
                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faPhoneVolume} /> 2 calls per month (55min/call)</p>
                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faComments} /> Unlimited Q&A via chat</p>
                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faClock} /> Expect responses in 2 days</p>
                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faBriefcase} /> Hands-on support</p>
                </div>
                <button className='btn-apply-now'>Apply now</button>
            </div>
        </div>
    );
};

export default MentorShipPlan;
