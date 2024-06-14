import React, { useEffect, useState } from 'react';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import Footer from '../../../components/footer/Footer';
import './MyWorkSpace.scss';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import altImg from '../../../assets/image/noImage.png';
import { useNavigate } from 'react-router-dom';


export default function MyWorkspace() {
    const [activeContent, setActiveContent] = useState('assignment');
    const [myMentors, setMyMentors] = useState([])
    const navigate = useNavigate()

    const fetchMentorListAPI = () => {
        axiosInstance.get(`${RYI_URL}/Workspace/mentee/my-mentors`)
            .then((response) => {
                console.log(response.data.data)
                setMyMentors(response.data.data)
            })
            .catch((error) => {
                console.log('There is an error fetch mentors', error)
            })
    }

    useEffect(fetchMentorListAPI, [])

    const renderBanner = () => {
        switch (activeContent) {
            case 'assignment':
                return <h2>Projects/ Tasks</h2>;
            case 'submission':
                return <h2>My Submissions</h2>;
            case 'mentors':
                return <h2>Mentors List</h2>;
            default:
                return <h2>Projects/Tasks</h2>;
        }
    };

    const renderWorkspaceContent = () => {
        switch (activeContent) {
            case 'assignment':
                return <div>Assignment Content</div>;
            case 'submission':
                return <div>Submission Content</div>;
            case 'mentors':
                return (
                    <div className='mentor-workspace-container'>
                        {myMentors ? myMentors.map((mentor) => (
                            <div key={mentor.id} className='mentor-workspace-item ' onClick={() => { handleSelectMentor(mentor.id) }}>
                                <img
                                    className='mentor-item-img'
                                    src={mentor.profilePic ? mentor.profilePic : altImg}
                                    alt={mentor.fullName}
                                    onError={(e) => { e.target.src = altImg; }}
                                />
                                <h3>{mentor.fullName}</h3>
                                <p>{mentor.jobTitle}</p>
                            </div>
                        )) :
                            (<div>There is no mentor</div>)
                        }
                    </div>)
            default:
                return <div>Default Content</div>;
        }
    };

    const handleSelectMentor = (id) => {
        navigate()
    }

    return (
        <div>
            <NavMentee activePage="workspace" />
            <div className='workspace-container'>
                <div className='navbar-workspace'>
                    <button
                        className={`btn-workspace btn-assignment ${activeContent === 'assignment' ? 'active' : ''}`}
                        onClick={() => setActiveContent('assignment')}
                    >
                        Assignment
                    </button>
                    <button
                        className={`btn-workspace btn-submission ${activeContent === 'submission' ? 'active' : ''}`}
                        onClick={() => setActiveContent('submission')}
                    >
                        Submission
                    </button>
                    <button
                        className={`btn-workspace mentors ${activeContent === 'mentors' ? 'active' : ''}`}
                        onClick={() => setActiveContent('mentors')}
                    >
                        My Mentors
                    </button>
                </div>
                <div className='content-workspace'>
                    <div className='banner-project'>
                        {renderBanner()}
                    </div>
                    <div className='my-workspace'>
                        {renderWorkspaceContent()}
                    </div>
                </div>
            </div>
            <Footer backgroundColor={'#6ADBD7'} color={'#274a79'} />
        </div>
    );
}
