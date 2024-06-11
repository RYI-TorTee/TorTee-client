import React from 'react'
import NavMentor from '../../../components/Nav-mentor/NavMentor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../../components/footer/Footer'
import './Application.scss'

export default function MentorApplication() {
    return (
        <>
            <NavMentor activePage="application" />
            <div className='mentor-applications-container'>
                <h1>Applications</h1>
                <div className='applications-list'>
                    <FontAwesomeIcon icon={faFileLines} size='3x' /><br></br>
                    <b>No active applications</b>
                    <p>Please wait for the mentees to apply to your package.</p>
                </div>
            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </>
    )
}
