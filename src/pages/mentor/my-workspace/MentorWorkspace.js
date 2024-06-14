import React, { useEffect, useState } from 'react';
import Footer from '../../../components/footer/Footer';
import './MentorWorkspace.scss';
import NavMentor from '../../../components/Nav-mentor/NavMentor';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText, faPhotoFilm, faUserGraduate, faVolleyball } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faSquarePlus, faSun } from '@fortawesome/free-regular-svg-icons';
import ModalAddAssignment from '../../../components/modal/modal-add-assignment/ModalAddAssignment';
import altImg from '../../../assets/image/noImage.png';
import { faAirbnb, faFreeCodeCamp, faJava, faLinux, faStudiovinari } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function MentorWorkspace() {
    const [activeContent, setActiveContent] = useState('assignment');
    const [myMentees, setMyMentees] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMenteeId, setSelectedMenteeId] = useState(null);
    const icons = [faAirbnb, faLinux, faSun, faJava, faFreeCodeCamp, faVolleyball, faPhotoFilm, faStudiovinari];
    const navigate = useNavigate();

    const fetchMenteeListAPI = () => {
        axiosInstance.get(`${RYI_URL}/Workspace/mentor/my-mentees`)
            .then((response) => {
                console.log('mentee', response);
                setMyMentees(response.data.data);
            })
            .catch((err) => {
                console.log('Error fetch mentees', err);
            });
    };

    const fetchAssignmentAPI = () => {
        axiosInstance.get(`${RYI_URL}/Workspace/mentor/assignments`)
            .then((response) => {
                console.log('assignment', response);
                setAssignments(response.data.data);
            })
            .catch((err) => {
                console.log('Error fetch assignments', err);
            });
    };

    useEffect(() => {
        fetchMenteeListAPI();
        fetchAssignmentAPI();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for DD-MM-YYYY format
    };

    const renderBanner = () => {
        switch (activeContent) {
            case 'assignment':
                return (
                    <>
                        <h2> My Assignments</h2>
                    </>
                )
            case 'mentees':
                return <h2>My Mentees</h2>;
            default:
                return <h2>Projects/Tasks</h2>;
        }
    };

    const handleClickAssignItem = (assignment) => {
        navigate(`/workspace/assignment/${assignment.id}`);
    };

    const renderWorkspaceContent = () => {
        switch (activeContent) {
            case 'assignment':
                return (
                    <div className='assignment-workspace-container'>
                        {assignments ? assignments.map((assignment, index) => (
                            <div key={assignment.id} className='assignment-item' onClick={() => { handleClickAssignItem(assignment) }}>
                                <FontAwesomeIcon className='font-awesome-icon-assignment' icon={icons[index % icons.length]} />
                                <h3>{assignment.title}</h3>
                                <p><b>Assign to:</b> {assignment.mentee.fullName}</p>
                                <p><b>Assigned date:</b> {formatDate(assignment.assignedDate)}</p>
                            </div>
                        )) : (<div>There is no assignments.</div>)}
                    </div>
                );
            case 'mentees':
                return (
                    <div className='mentee-workspace-container'>
                        {myMentees ? myMentees.map((mentee) => (
                            <div key={mentee.id} className='mentee-item'>
                                <img
                                    className='mentee-item-img'
                                    src={mentee.profilePic ? mentee.profilePic : altImg}
                                    alt={mentee.fullName}
                                    onError={(e) => { e.target.src = altImg; }}
                                />
                                <div>
                                    <h3>{mentee.fullName}</h3>
                                    <p><b><FontAwesomeIcon className='font-awesome-icon' icon={faEnvelopeOpenText} /></b> {mentee.email}</p>
                                </div>
                                <button className='btn-add-assignment' onClick={() => handleAddAssignment(mentee.id)}>
                                    <FontAwesomeIcon className='font-awesome-icon' icon={faSquarePlus} /> Add Assignment
                                </button>
                            </div>
                        )) : (<div>Loading...</div>)}
                    </div>
                );
            default:
                return <div>Default Content</div>;
        }
    };

    const handleAddAssignment = (menteeId) => {
        setSelectedMenteeId(menteeId);
        setShowModal(true);
    };

    return (
        <div>
            <NavMentor activePage="workspace" />
            <div className='workspace-container'>
                <div className='navbar-workspace'>
                    <button
                        className={`btn-workspace btn-submission ${activeContent === 'assignment' ? 'active' : ''}`}
                        onClick={() => setActiveContent('assignment')}
                    >
                        <FontAwesomeIcon className='font-awesome-icon' icon={faPaperPlane} /> My Assignments
                    </button>
                    <button
                        className={`btn-workspace mentors ${activeContent === 'mentees' ? 'active' : ''}`}
                        onClick={() => setActiveContent('mentees')}
                    >
                        <FontAwesomeIcon className='font-awesome-icon' icon={faUserGraduate} /> My Mentees
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
            {showModal && <ModalAddAssignment menteeId={selectedMenteeId} onClose={() => { setShowModal(false); fetchAssignmentAPI(); }} />}
        </div>
    );
}
