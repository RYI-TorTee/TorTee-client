import React, { useEffect, useState } from 'react';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import Footer from '../../../components/footer/Footer';
import './MyWorkSpace.scss';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import altImg from '../../../assets/image/noImage.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAirbnb, faFreeCodeCamp, faJava, faLinux, faStudiovinari } from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare, faStar, faSun } from '@fortawesome/free-regular-svg-icons';
import { faCloudArrowDown, faPhotoFilm, faVolleyball } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';

export default function MyWorkspace() {
    const [activeContent, setActiveContent] = useState('assignment');
    const [myMentors, setMyMentors] = useState([]);
    const [myAssignments, setMyAssignments] = useState([]);
    const [mySubmissions, setMySubmission] = useState([]);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const icons = [faAirbnb, faLinux, faSun, faJava, faFreeCodeCamp, faVolleyball, faPhotoFilm, faStudiovinari];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mentorsResponse, assignmentsResponse, submissionsResponse] = await Promise.all([
                    axiosInstance.get(`${RYI_URL}/Workspace/mentee/my-mentors`),
                    axiosInstance.get(`${RYI_URL}/Workspace/mentee/my-assignments`),
                    axiosInstance.get(`${RYI_URL}/Workspace/mentee/my-submissions`)
                ]);

                setMyMentors(mentorsResponse.data.data);
                setMyAssignments(assignmentsResponse.data.data);
                setMySubmission(submissionsResponse.data.data);

                console.log('Mentors:', mentorsResponse.data.data);
                console.log('Assignments:', assignmentsResponse.data.data);
                console.log('Submissions:', submissionsResponse.data.data);
            } catch (error) {
                console.log('Error fetching data', error);
            }
        };

        fetchData();
    }, []);
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
            case "assignment":
                return (
                    <div className='assignment-workspace-container'>
                        {myAssignments.length ? myAssignments.map((assignment, index) => (
                            <div key={assignment.id} className='assignment-item' onClick={() => handleClickAssignItem(assignment)}>
                                <FontAwesomeIcon className='font-awesome-icon-assignment' icon={icons[index % icons.length]} />
                                <h3>{assignment.title}</h3>
                                {assignment.isSubmited ? (<div className='is-submitted'>is submitted</div>) : (<div></div>)
                                }
                                <p><b>Assigned by:</b> {assignment.mentor.fullName}</p>
                                <p><b>Assigned date:</b> {formatDate(assignment.assignedDate)}</p>
                            </div>
                        )) : (<div>There is no assignments.</div>)}
                    </div>
                );
            case 'submission':
                return (
                    <div className='submission-workspace-container'>
                        {mySubmissions.length ? mySubmissions.map((sub) => (
                            <div key={sub.id} className='submission-item'>
                                <p>
                                    <a className='download-file' href={sub.file} target="_blank" rel="noopener noreferrer">File Submitted <FontAwesomeIcon icon={faCloudArrowDown} /></a>
                                </p>
                                <ListGroup className='list-submitted-info'>
                                    <ListGroup.Item><b>Submitted Date:</b> {formatDate(sub.submittedDate)}</ListGroup.Item>
                                    <ListGroup.Item><b>Grade:</b> {sub.grade}</ListGroup.Item>
                                    <ListGroup.Item><b>Submission Status:</b> <span className={sub.status === 'UNGRADED' ? 'ungraded' : 'graded'}>{sub.status}</span></ListGroup.Item>
                                    {sub.commentOfMentor ? <ListGroup.Item ><b>Mentor's comment:</b> {sub.commentOfMentor}</ListGroup.Item> : <></>}
                                    {role === 'Mentor' && (
                                        <ListGroup.Item><button className='btn-grade'><FontAwesomeIcon icon={faPenToSquare} /> Grade</button></ListGroup.Item>
                                    )}
                                </ListGroup>
                            </div>
                        )) : (<div>There are no submissions.</div>)}
                    </div>
                );
            case "mentors":
                return (
                    <div className='mentor-workspace-container'>
                        {myMentors.length ? myMentors.map((mentor) => (
                            <div key={mentor.id} className='mentor-workspace-item' >
                                <img
                                    className='mentor-item-img'
                                    src={mentor.profilePic || altImg}
                                    alt={mentor.fullName}
                                    onError={(e) => { e.target.src = altImg; }}

                                />
                                <h3>{mentor.fullName}</h3>
                                <p>{mentor.jobTitle}</p>
                            </div>
                        )) : (<div>There is no mentor</div>)}
                    </div>
                );
            default:
                return <div>Default Content</div>;
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for DD-MM-YYYY format
    };

    const handleClickAssignItem = (assignment) => {
        navigate(`/workspace/assignment/${assignment.id}`);
    };

    const handleSelectMentor = (id) => {
        navigate(`/userProfile/${id}`);
    };

    return (
        <div>
            <NavMentee activePage="workspace" />
            <div className='workspace-container'>
                <div className='navbar-workspace'>
                    <button
                        className={`btn-workspace btn-assignment ${activeContent === 'assignment' ? 'active' : ''}`}
                        onClick={() => setActiveContent('assignment')}
                    >
                        My Assignment Received
                    </button>
                    <button
                        className={`btn-workspace btn-submission ${activeContent === 'submission' ? 'active' : ''}`}
                        onClick={() => setActiveContent('submission')}
                    >
                        My Submission
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
            <Footer backgroundColor={'#274A79'} color={'#F9FDFF'} />
        </div>
    );
}
