import React from 'react'
import './ApplyQuestion.scss'
import NavMentee from '../../../../components/Nav-mentee/NavMentee'
import Footer from '../../../../components/footer/Footer'

export default function ApplyQuestion() {
    return (
        <div>
            <NavMentee activePage="mentors" />
            <div className='apply-question-container'>
                <h2 className='apply-title'>
                    Please answer some questions to confirm your application.
                </h2>

                <div className='questions-container'></div>


            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    )
}
