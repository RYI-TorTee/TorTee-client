import React, { useEffect, useState } from 'react';
import './ApplicationDetail.scss';
import NavMentor from '../../../../components/Nav-mentor/NavMentor';
import Footer from '../../../../components/footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import altImg from '../../../../assets/image/banner-img1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { faBriefcase, faClock, faComments, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../../../service/AxiosInstance';
import { RYI_URL } from '../../../../URL_BE/urlbackend';

export default function ApplicationDetail() {
    const navigate = useNavigate();
    const { applicationId } = useParams();
    const [detail, setDetail] = useState({});
    const role = localStorage.getItem('role');

    const updateApplicationStatus = async (status) => {
        try {
            const response = await axiosInstance.put(`${RYI_URL}/mentor/update-application`, {
                id: applicationId,
                status: status
            });
            console.log(response);

            navigate('/mentor/application');
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    const fetchApplicationAPI = () => {
        axiosInstance.get(`${RYI_URL}/application/${applicationId}`)
            .then((response) => {
                console.log(response)
                setDetail(response.data.data)

            })
            .catch((err) => { })
    }

    useEffect(fetchApplicationAPI, [applicationId])

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for DD-MM-YYYY format
    };

    return (
        <div>
            <NavMentor activePage="application" />
            {detail ? (
                (role === 'Mentor' ? (
                    <div className="application-detail-container">
                        <div className='mentee-infor-detail'>
                            <img
                                className='img-application'
                                src={detail.user?.profilePic || altImg}
                                alt={detail.user?.fullName || 'No Name'}
                                onError={(e) => { e.target.src = altImg; }}
                            />
                            <h2>{detail.user?.fullName || 'No Name'}</h2>
                            <p><b><FontAwesomeIcon icon={faEnvelopeOpen} /></b> {detail.user?.email || 'No Email'}</p>
                            <p><b>Applied Date: </b> {formatDate(detail.appliedDate)}</p>

                            {
                                detail.status === 'PENDING' ? (
                                    <div>
                                        <button className='btn-update-apllication accept' onClick={() => updateApplicationStatus('ACCEPTED')}>Accept</button>
                                        <button className='btn-update-apllication deny' onClick={() => updateApplicationStatus('DENIED')}>Deny</button>
                                    </div>

                                ) : detail.status === 'ACCEPTED' ? (
                                    <p className='status-accepted'>ACCEPTED</p>
                                ) : (
                                    <p className='status-denied'>DENIED</p>

                                )
                            }
                        </div>
                        <div className='mentee-detail-application'>
                            <div className='my-mentorship-plan'>
                                <h3> MentorShip Plan Booking</h3>
                                <h4>{detail.menteePlan?.price}/month</h4>
                                <p>{detail.menteePlan?.descriptionOfPlan}</p>
                                <div style={{ marginTop: '30px' }}>
                                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faPhoneVolume} /> {detail.menteePlan?.callPerMonth} calls per month ({detail.menteePlan?.durationOfMeeting}min/call)</p>
                                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faComments} /> Unlimited Q&A via chat</p>
                                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faClock} /> Remain {detail.menteePlan?.remainSlot} slots</p>
                                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faBriefcase} /> Hands-on support</p>
                                </div>
                            </div>
                            <div className='mentee-application-answer'>
                                <h3>Mentee application answers</h3>
                                <div>
                                    {/* Thêm nội dung câu trả lời của mentee nếu có */}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="application-detail-container">
                        <div className='mentee-infor-detail'>
                            <img
                                className='img-application'
                                src={detail.mentor.profilePic}
                                alt={detail.mentor.fullName}
                                onError={(e) => { e.target.src = altImg; }}
                            />
                            <h2>{detail.mentor ? detail.mentor.fullName : 'No Name'}</h2>

                            <p><b><FontAwesomeIcon icon={faEnvelopeOpen} /></b> {detail.mentor.email}</p>
                            <p><b>Applied Date: </b> {formatDate(detail.appliedDate)}</p>

                        </div>
                        <div className='mentee-detail-application'>
                            <div className='my-mentorship-plan'>
                                <h3> MentorShip Plan Booking</h3>
                                <h4>{detail.menteePlan.price}/month</h4>
                                <p>{detail.menteePlan.descriptionOfPlan}</p>
                                <div style={{ marginTop: '30px' }}>
                                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faPhoneVolume} /> {detail.menteePlan.callPerMonth} calls per month ({detail.menteePlan.durationOfMeeting}min/call)</p>
                                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faComments} /> Unlimited Q&A via chat</p>
                                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faClock} /> Remain {detail.menteePlan.remainSlot} slots</p>
                                    <p><FontAwesomeIcon className='icon-mentorship-plan' icon={faBriefcase} /> Hands-on support</p>
                                </div>
                            </div>
                            <div className='mentee-application-answer'>
                                <h3>Mentee application answers</h3>
                                <div>
                                    {/* Thêm nội dung câu trả lời của mentee nếu có */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No application details available.</p>
            )}
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    );
}
