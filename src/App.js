import './App.scss';
import HomePage from './pages/home/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import SignUpMentee from './pages/sign-up/signup-mentee/SignUpMentee';
import SignUpMentor from './pages/sign-up/signup-mentor/SignUpMentor';
import MenteeHomePage from './pages/mentee/home-mentee/HomeMentee';
import MyWorkspace from './pages/mentee/my-workspace/MyWorkspace';
import Application from './pages/mentee/application/Application';
import BrowseMentor from './pages/mentee/browse-mentor/BrowseMentor';
import MessengerMentee from './pages/mentee/messenger/Messenger';
import MenteeNotification from './pages/mentee/notification/NotificationMentee';
import HomeMentor from './pages/mentor/home-mentor/HomeMentor';
import MentorProfile from './pages/mentee/mentor-profile/MentorProfile';
import MentorWorkspace from './pages/mentor/my-workspace/MentorWorkspace';
import MentorApplication from './pages/mentor/application/Application';
import MentorMessenger from './pages/mentor/message/MentorMessenger';
import MentorNotification from './pages/mentor/notification/MentorNotification';

function App() {
  return (
    <div className="App">
      <Routes>
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

        <Route path="/mentor-homepage" element={<HomeMentor />} />
        <Route path="/mentor/workspace" element={<MentorWorkspace />} />
        <Route path="/mentor/application" element={<MentorApplication />} />
        <Route path="/mentor/message" element={<MentorMessenger />} />
        <Route path="/mentor/notification" element={<MentorNotification />} />

      </Routes>
    </div>
  );
}

export default App;
