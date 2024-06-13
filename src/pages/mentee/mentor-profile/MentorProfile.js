import React, { useEffect, useState } from 'react';
import './MentorProfile.scss';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import bannerImg from '../../../assets/image/banner-img1.jpg';
import MentorshipPlan from '../../../components/mentee/mentorship-plan/MentorshipPlan';
import Footer from '../../../components/footer/Footer';
import MentorSkills from '../../../components/mentee/mentor-skill/MentorSkills';
import ReviewMentors from '../../../components/mentee/review-mentor/ReviewMentors';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';

export default function MentorProfile() {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState({});

    useEffect(() => {
        axiosInstance.get(`${RYI_URL}/Account/${mentorId}`)
            .then(response => {
                setMentor(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the mentor's profile!", error);
            });
    }, [mentorId]);

    return (
        <div>
            <NavMentee activePage="mentors" />
            <div className='mentor-profile-detail-container'>
                <div className='header-mentor-profile'>
                    <img src={mentor.profilePic || bannerImg} className='mentor-profile-detail-img' alt='Banner' />
                </div>
                <div className='body-mentor-profile'>
                    <div className='mentor-profile-main'>
                        <div className='mentor-profile-detail'>
                            <h2>{mentor.fullName}</h2>
                            <p className='job-title'>{mentor.jobTitle}</p>
                            <div className='mentor-contact-info'>
                                <p><FontAwesomeIcon className='font-awesome-icon' icon={faEnvelope} /> {mentor.email}</p>
                                <p><FontAwesomeIcon className='font-awesome-icon' icon={faMobileScreen} /> {mentor.phoneNumber}</p>
                                <p><FontAwesomeIcon className='font-awesome-icon' icon={faBuilding} /> {mentor.company}</p>
                            </div>
                        </div>
                        <MentorSkills skills={mentor.skills} />
                    </div>
                    <div className='mentor-profile-about'>
                        <h2>About</h2>
                        <p className='mentor-about-content'>{mentor.bio}</p>
                    </div>
                    <ReviewMentors reviews={mentor.reviews} />
                </div>
                <MentorshipPlan id={mentorId} />
            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    );
}
