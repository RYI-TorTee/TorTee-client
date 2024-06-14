import React, { useEffect, useState } from 'react'
import './AssignmentDetail.scss'
import NavMentor from '../../../components/Nav-mentor/NavMentor'
import Footer from '../../../components/footer/Footer'
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import { useParams } from 'react-router-dom';

export default function AssignmentDetail() {
    const [assignment, setAssignment] = useState({});
    const { assignmentId } = useParams();

    const fetchAssignmentAPI = () => {
        axiosInstance.get(`${RYI_URL}/Workspace/assignments/${assignmentId}`)
            .then((response) => {

                console.log('assignment detail: ', response)
                setAssignment(response.data.data)

            })
            .catch((error => {
                console.log('Error on get assignment detail', error)
            }))
    }

    useEffect(fetchAssignmentAPI, [assignmentId])

    return (
        <div>
            <NavMentor activePage="workspace" />
            <div className='assignment-detail-container'>

            </div>
            <Footer backgroundColor={'#6ADBD7'} color={'#274a79'} />
        </div>
    )
}
