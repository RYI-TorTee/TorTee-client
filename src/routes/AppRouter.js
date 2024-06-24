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
import HomeMentor from '../pages/mentor/home-mentor/HomeMentor';
import MentorWorkspace from '../pages/mentor/my-workspace/MentorWorkspace';
import MentorApplication from '../pages/mentor/application/Application';
import MentorMessenger from '../pages/mentor/message/MentorMessenger';
import SignupSuccess from '../pages/sign-up/signup-mentee/signup-success/SignupSuccess';
import Payment from '../pages/mentee/payment/Payment';
import StaffManage from '../pages/staff/StaffManage';
import SignupMentorSuccess from '../pages/sign-up/signup-mentor/signup-success/SignupMentorSuccess';
import ApplyQuestion from '../pages/mentee/mentor-profile/apply-confirm/ApplyQuestion';
import ApplicationDetail from '../pages/mentor/application/application-detail/ApplicationDetail';
import MyProfile from '../pages/common/my-profile/MyProfile';
import AssignmentDetail from '../pages/common/assignment-detail/AssignmentDetail';
import SubmissionDetail from '../pages/common/submission-detail/SubmissionDetail';
import UserProfile from '../pages/common/user-profile/UserProfile';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import AdminManagement from '../pages/admin/AdminManagement';
import Notification from '../pages/common/notification/Notification';

const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup/mentee" element={<SignUpMentee />} />
                <Route path="/signup/mentor" element={<SignUpMentor />} />
                <Route path="/mentee-signup-success" element={<SignupSuccess />} />
                <Route path="/mentor-signup-success" element={<SignupMentorSuccess />} />



                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    {/* Mentee */}
                    <Route path="/mentee-homepage" element={<MenteeHomePage />} />
                    <Route path="/mentee-workspace" element={<MyWorkspace />} />
                    <Route path="/mentee/application" element={<Application />} />
                    <Route path="/mentee/my-mentors" element={<BrowseMentor />} />
                    <Route path="/mentee/messenger" element={<MessengerMentee />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/mentee/payment" element={<Payment />} />
                    <Route path="/mentee/mentor-profile/apply-confirm/:mentorshipPlan" element={<ApplyQuestion />} />

                    {/* Mentor */}
                    <Route path="/mentor-homepage" element={<HomeMentor />} />
                    <Route path="/mentor/workspace" element={<MentorWorkspace />} />
                    <Route path="/mentor/application" element={<MentorApplication />} />
                    <Route path="/message" element={<MentorMessenger />} />

                    {/* Common */}
                    <Route path="/application/:applicationId" element={<ApplicationDetail />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/workspace/assignment/:assignmentId" element={<AssignmentDetail />} />
                    <Route path="/workspace/submission/:submissionId" element={<SubmissionDetail />} />
                    <Route path="/userProfile/:userId" element={<UserProfile />} />
                </Route>

                {/* Role StaffManage */}
                <Route path="/staff-management" element={<StaffManage />} />

                {/* Role Admin */}
                <Route path="/admin-management" element={<AdminManagement />} />
            </Routes>
        </AuthProvider>
    );
};

export default AppRouter;
