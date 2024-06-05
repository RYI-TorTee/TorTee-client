import React from 'react';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import Footer from '../../../components/footer/Footer'
import './Application.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

export default function Application() {
    return (
        <>
            <NavMentee activePage="application" />
            <div className='applications-container'>
                <h1>Applications</h1>
                <div className='applications-list'>
                    <FontAwesomeIcon icon={faFileLines} size='3x' /><br></br>
                    <b>No active applications</b>
                    <p>Once you've applied  to a mentor, they will show up here!</p>
                    <Link className='btn-find-mentor' to='/mentee/my-mentors'> Find mentors</Link>
                </div>
            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </>
    )
}
