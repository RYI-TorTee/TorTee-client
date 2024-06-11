import React from 'react';
import { BrowserRouter as Router, Route, useLocation, Link, Routes, Outlet } from 'react-router-dom';
import './MentorProfileSetting.scss';
import NavMentor from '../../../components/Nav-mentor/NavMentor';
import Footer from '../../../components/footer/Footer';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function UpdateProfile() {
    return (
        <div className='setting-content'>
            <h2>Update Profile</h2>
        </div>
    );
}

function AddMentorshipPlan() {
    return (
        <div className='setting-content'>
            <h2>Add Mentorship Plan</h2>
        </div>
    );
}

function MentorProfileContent() {
    const query = useQuery();
    const tab = query.get('tab') || 'update-profile';

    return (
        <div className='profile-setting-container'>
            <nav>
                <ul className='tab-setting-container'>
                    <li className='btn-tab-setting-li'>
                        <Link className='btn-tab-setting' to="?tab=update-profile">Update Profile</Link>
                    </li>
                    <li className='btn-tab-setting-li'>
                        <Link className='btn-tab-setting' to="?tab=add-mentorship-plan">Add Mentorship Plan</Link>
                    </li>
                </ul>
            </nav>
            {tab === 'update-profile' && <UpdateProfile />}
            {tab === 'add-mentorship-plan' && <AddMentorshipPlan />}
        </div>
    );
}

export default function MentorProfile() {
    return (
        <div>
            <NavMentor />
            <div>
                <Routes>
                    <Route path="/" element={<MentorProfileContent />} />
                </Routes>
            </div>
            <Footer backgroundColor={'#6ADBD7'} color={'#274a79'} />
        </div>
    );
}
