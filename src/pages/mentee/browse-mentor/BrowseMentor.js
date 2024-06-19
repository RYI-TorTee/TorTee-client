import React, { useEffect, useState } from 'react';
import "./BrowseMentor.scss";
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import img from "../../../assets/image/noImage.png"
import Footer from "./../../../components/footer/Footer"
import { Link } from 'react-router-dom';
import { RYI_URL } from '../../../URL_BE/urlbackend'
import axiosInstance from '../../../service/AxiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function BrowseMentor() {


    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        axiosInstance.get(`${RYI_URL}/Mentor/browse-mentor?PageSize=100`)
            .then(response => {
                setMentors(response.data.data.data);
                console.log(response.data.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the mentors!", error);
            });
    }, []);


    return (
        <>
            <NavMentee activePage="mentors" />
            <div className='browse-mentor-container'>


                <div className='mentors-list-container'>
                    <h1 className='mentor-community-title'>MENTOR COMMUNITY</h1>
                    <div className='mentors-list'>
                        {mentors.map((mentor, index) => (
                            <div className='mentor-item' key={index}>
                                <img src={mentor.profilePic || img} className='img-mentor-profile' alt='img-mentor-profile' />
                                <div className='mentor-item-infor'>
                                    <p >{mentor.fullName}</p>
                                    <p>JOB: {mentor.jobTitle ? mentor.jobTitle : mentor.jobTitle === 'null' ? '' : ''}</p>
                                    <p><FontAwesomeIcon icon={faLocationDot} /> {mentor.company ? mentor.company : '...'}</p>

                                    <span>{mentor.bio}</span>
                                    <Link to={`/userProfile/${mentor.id}`} className='btn-view-profile'>View Profile</Link>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <Footer backgroundColor={"#6ADBD7"} color={'#274a79'} />
        </>
    );
}
