import React, { useEffect, useState } from 'react'
import './ApplyQuestion.scss'
import NavMentee from '../../../../components/Nav-mentee/NavMentee'
import Footer from '../../../../components/footer/Footer'
import axiosInstance from '../../../../service/AxiosInstance';
import { RYI_URL } from '../../../../URL_BE/urlbackend';


export default function ApplyQuestion() {
    const [questions, setQuestion] = useState([])

    const fetchAPI = () => {
        axiosInstance.get(`${RYI_URL}/ApplicationQuestion`)
            .then(response => {
                setQuestion(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching questions!", error);
            });
    }
    useEffect(fetchAPI, [])
    return (
        <div>
            <NavMentee activePage="mentors" />
            <form className='apply-question-container'>
                <h2 className='apply-title'>
                    Please answer some questions to confirm your application.
                </h2>

                <div className='questions-container'>
                    {questions.map((question, i) => (
                        <div className='input-field question'>
                            <label>{i + 1}. {question.content}</label>
                            <textarea />
                        </div>
                    ))}
                    <button className='btn-submit-answer'>Submit</button>
                </div>


            </form>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    )
}
