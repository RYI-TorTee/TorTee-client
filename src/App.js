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
        <Route path="/application" element={<Application />} />
        <Route path="/mentee/my-mentors" element={<BrowseMentor />} />
        <Route path="/mentee-messenger" element={<MessengerMentee />} />
        <Route path="/mentee-notification" element={<MenteeNotification />} />
      </Routes>
    </div>
  );
}

export default App;
