import './App.scss';
import HomePage from './pages/home/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import SignUpMentee from './pages/sign-up/signup-mentee/SignUpMentee';
import SignUpMentor from './pages/sign-up/signup-mentor/SignUpMentor';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/mentee" element={<SignUpMentee />} />
          <Route path="/signup/mentor" element={<SignUpMentor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
