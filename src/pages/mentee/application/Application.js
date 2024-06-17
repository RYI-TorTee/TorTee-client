import React, { useEffect, useState } from 'react';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import Footer from '../../../components/footer/Footer';
import './Application.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import img from '../../../assets/image/banner-img1.jpg'; // Import your default image

export default function Application() {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    const fetchApplicationApi = () => {
        axiosInstance.get(`${RYI_URL}/mentee/applications`)
            .then((response) => {
                console.log(response);
                setApplications(response.data.data);
            })
            .catch((err) => {
                console.log('Error: ' + err);
            });
    };

    useEffect(() => {
        fetchApplicationApi();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for DD-MM-YYYY format
    };

    const handlePayment = () => {
        axiosInstance.get(`${RYI_URL}/Payment/payment-callback`)
            .then((response) => {
                if (response.data.isSuccess) {
                    console.log('Payment successful:', response);
                } else {
                    console.error('Payment error:', response.messages[0].content);

                }
            })
            .catch((err) => {
                console.error('Payment error:', err);
            });
    };
    const handleViewDetail = (applicationId) => {
        navigate(`/application/${applicationId}`)
    }

    return (
        <>
            <NavMentee activePage="application" />
            <div className='applications-container'>
                <h1>Applications</h1>
                <div className={`${applications.length > 0 ? 'applications-list' : 'no-applications-list'}`}>
                    {applications && applications.length > 0 ? (
                        applications.map((application, index) => (
                            <div key={index} className='application-item'>
                                <img
                                    className='img-application'
                                    src={application.mentor.profilePic}
                                    alt={application.mentor.fullName}
                                    onError={(e) => { e.target.src = img; }}
                                />
                                <div>
                                    <h3>{application.mentor.fullName}</h3>
                                    <small>{application.mentor.jobTitle}</small>
                                    <p><b>Applied date: </b> {formatDate(application.appliedDate)}</p>
                                    <p><b>Status: </b> <span className={` status ${application.status === 'PENDING' ? 'pending-status' : application.status === 'ACCEPTED' ? 'accept-status' : 'denied-status'}`}>
                                        {application.status}
                                    </span></p>
                                    <button className='btn-view-detail-application' onClick={() => { handleViewDetail(application.id) }}>View detail</button>

                                    {application.status === 'ACCEPTED' && (
                                        <button className='btn-payment' onClick={() => handlePayment(application.id)}>Payment</button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='no-applications'>
                            <FontAwesomeIcon icon={faFileLines} size='3x' /><br />
                            <b>No active applications</b>
                            <p>Once you've applied to a mentor, they will show up here!</p>
                            <Link className='btn-find-mentor' to='/mentee/my-mentors'>Find mentors</Link>
                        </div>
                    )}
                </div>
            </div>
            <Footer backgroundColor={'#274A79'} color={'#F9FDFF'} />
        </>
    );
}
