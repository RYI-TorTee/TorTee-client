import React, { useEffect, useState } from 'react';
import Footer from '../../../components/footer/Footer';
import './MentorWorkspace.scss';
import NavMentor from '../../../components/Nav-mentor/NavMentor';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

export default function MentorWorkspace() {
    const [activeContent, setActiveContent] = useState('submission');
    const [myMentees, setMyMentees] = useState([]);

    const fetchMenteeListAPI = () => {
        axiosInstance.get(`${RYI_URL}/Workspace/mentor/my-mentees`)
            .then((response) => {
                console.log(response);
                setMyMentees(response.data.data);
            })
            .catch((err) => {
                console.log('Error fetch mentees', err);
            });
    };

    useEffect(() => {
        fetchMenteeListAPI();
    }, []);

    const renderBanner = () => {
        switch (activeContent) {
            case 'submission':
                return <h2>My Submissions</h2>;
            case 'mentees':
                return <h2>My Mentees</h2>;
            default:
                return <h2>Projects/Tasks</h2>;
        }
    };

    const renderWorkspaceContent = () => {
        switch (activeContent) {
            case 'submission':
                return <div>Submission Content</div>;
            case 'mentees':
                return (
                    <div className='mentee-workspace-container'>
                        {myMentees && myMentees.map((mentee) => (
                            <div key={mentee.id} className='mentee-item'>
                                <img
                                    className='mentee-item-img'
                                    src={mentee.profilePic}
                                    alt={mentee.fullName}
                                />
                                <div>
                                    <h3>{mentee.fullName}</h3>
                                    <p><b><FontAwesomeIcon icon={faEnvelopeOpenText} /></b> {mentee.email}</p>
                                    <button className='btn-add-assignment'>Add Assignment</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return <div>Default Content</div>;
        }
    };

    return (
        <div>
            <NavMentor activePage="workspace" />
            <div className='workspace-container'>
                <div className='navbar-workspace'>
                    <button
                        className={`btn-workspace btn-submission ${activeContent === 'submission' ? 'active' : ''}`}
                        onClick={() => setActiveContent('submission')}
                    >
                        View Submission
                    </button>
                    <button
                        className={`btn-workspace mentors ${activeContent === 'mentees' ? 'active' : ''}`}
                        onClick={() => setActiveContent('mentees')}
                    >
                        My Mentees
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
