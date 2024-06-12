// AppRouter.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import SignIn from '../pages/sign-in/SignIn';
import SignUp from '../pages/sign-up/SignUp';
import SignUpMentee from '../pages/sign-up/signup-mentee/SignUpMentee';
import SignUpMentor from '../pages/sign-up/signup-mentor/SignUpMentor';
import MenteeHomePage from '../pages/mentee/home-mentee/HomeMentee';
import MyWorkspace from '../pages/mentee/my-workspace/MyWorkspace';
import Application from '../pages/mentee/application/Application';
import BrowseMentor from '../pages/mentee/browse-mentor/BrowseMentor';
import MessengerMentee from '../pages/mentee/messenger/Messenger';
import MenteeNotification from '../pages/mentee/notification/NotificationMentee';
import MentorProfile from '../pages/mentee/mentor-profile/MentorProfile';
import HomeMentor from '../pages/mentor/home-mentor/HomeMentor';
import MentorWorkspace from '../pages/mentor/my-workspace/MentorWorkspace';
import MentorApplication from '../pages/mentor/application/Application';
import MentorMessenger from '../pages/mentor/message/MentorMessenger';
import MentorNotification from '../pages/mentor/notification/MentorNotification';
import SignupSuccess from '../pages/sign-up/signup-mentee/signup-success/SignupSuccess';
import Payment from '../pages/mentee/payment/Payment';
import StaffManage from '../pages/staff/StaffManage';
import SignupMentorSuccess from '../pages/sign-up/signup-mentor/signup-success/SignupMentorSuccess'
import ApplyQuestion from '../pages/mentee/mentor-profile/apply-confirm/ApplyQuestion';
import MyProfileMentee from '../pages/mentee/my-profile/MyProfileMentee';
import MyProfileMentor from '../pages/mentor/my-profile/MyProfileMentor'

const AppRouter = () => {
    return (
        <Routes>
            {/* Role Mentee */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/mentee" element={<SignUpMentee />} />
            <Route path="/signup/mentor" element={<SignUpMentor />} />
            <Route path="/mentee-homepage" element={<MenteeHomePage />} />
            <Route path="/mentee-workspace" element={<MyWorkspace />} />
            <Route path="/mentee/application" element={<Application />} />
            <Route path="/mentee/my-mentors" element={<BrowseMentor />} />
            <Route path="/mentee/messenger" element={<MessengerMentee />} />
            <Route path="/mentee/notification" element={<MenteeNotification />} />
            <Route path="/mentee/mentor-profile" element={<MentorProfile />} />
            <Route path="/mentee-signup-success" element={<SignupSuccess />} />
            <Route path="/mentee/payment" element={<Payment />} />
            <Route path="/mentee/mentor-profile/apply-confirm" element={<ApplyQuestion />} />
            <Route path="/mentee/my-profile" element={<MyProfileMentee />} />




            {/* Role Mentor */}
            <Route path="/mentor-homepage" element={<HomeMentor />} />
            <Route path="/mentor/workspace" element={<MentorWorkspace />} />
            <Route path="/mentor/application" element={<MentorApplication />} />
            <Route path="/mentor/message" element={<MentorMessenger />} />
            <Route path="/mentor/notification" element={<MentorNotification />} />
            <Route path="/mentor-signup-success" element={<SignupMentorSuccess />} />
            <Route path="/mentor/my-profile" element={<MyProfileMentor />} />

            {/* Role StaffManage */}
            <Route path="/staff-management" element={<StaffManage />} />


        </Routes>
    );
};

export default AppRouter;
