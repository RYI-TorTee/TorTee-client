import React from 'react';
import './MentorProfile.scss';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import bannerImg from '../../../assets/image/banner-img1.jpg';
import MentorshipPlan from '../../../components/mentee/mentorship-plan/MentorshipPlan';
import Footer from '../../../components/footer/Footer'
import MentorSkills from '../../../components/mentee/mentor-skill/MentorSkills'
import ReviewMentors from '../../../components/mentee/review-mentor/ReviewMentors';


export default function MentorProfile() {
    return (
        <div>
            <NavMentee activePage="mentors" />
            <div className='mentor-profile-detail-container'>
                <div className='header-mentor-profile'>
                    <img src={bannerImg} className='mentor-profile-detail-img' alt='Banner' />
                </div>
                <div className='body-mentor-profile'>
                    <div className='mentor-profile-main'>
                        <div className='mentor-profile-detail'>
                            <h2>Tỏ Tê</h2>
                            <p className='mentor-profile-intro'>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                        </div>
                        <MentorSkills />
                    </div>
                    <div className='mentor-profile-about'>
                        <h2 className=''>About</h2>
                        <p className='mentor-about-content'>sdasdsadasdasdasdaaaaaaaaaaaaaaaaaa
                            áddddddddddddddddddddddddddddđ
                            asssssssssssssssssssssss
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </p>
                    </div>
                    <ReviewMentors />
                </div>
                <MentorshipPlan />

            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    );
}
