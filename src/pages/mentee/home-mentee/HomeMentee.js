import React, { useEffect, useState } from "react";
import "./HomeMentee.scss";
import NavMentee from "../../../components/Nav-mentee/NavMentee";
import image from "../../../assets/image/banner-img1.jpg";
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../../../components/footer/Footer'
import { RYI_URL } from '../../../URL_BE/urlbackend'
import axiosInstance from "../../../service/AxiosInstance";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import img from '../../../assets/image/noImage.png'
import { fetchAPIMyProfile } from "../../../services/service";

// Giả sử bạn có danh sách mentor từ đâu đó (có thể từ props hoặc state)
const mentors = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        occupation: "Software Engineer",
        skills: "JavaScript, React, Node.js",
        image: "../../../assets/image/banner-img1.jpg" // thay thế bằng đường dẫn thực tế
    },
    {
        id: 2,
        name: "Trần Thị B",
        occupation: "Data Scientist",
        skills: "Python, Machine Learning, Data Analysis",
        image: "path/to/image2.jpg" // thay thế bằng đường dẫn thực tế
    },
    {
        id: 3,
        name: "Lê Văn C",
        occupation: "UX Designer",
        skills: "Sketch, Figma, Prototyping",
        image: "path/to/image3.jpg" // thay thế bằng đường dẫn thực tế
    },
    {
        id: 4,
        name: "Phạm Thị D",
        occupation: "Product Manager",
        skills: "Project Management, Agile, Scrum",
        image: "path/to/image4.jpg" // thay thế bằng đường dẫn thực tế
    },
    // Thêm nhiều mentor hơn nếu cần
];

function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

export default function MenteeHomePage() {
    const mentorGroups = chunkArray(mentors, 2); // Chia danh sách mentor thành các nhóm mỗi nhóm chứa 2 mentor
    const [mentorRecommend, setMentorRecommend] = useState([]);

    useEffect(() => {
        axiosInstance.get(`${RYI_URL}/Mentor/recommendation`)
            .then(response => {
                setMentorRecommend(response.data.data);  // Đặt dữ liệu nhận được vào state
                console.log(response.data.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the mentors!", error);
            });
    }, []);

    const [myProfile, setMyprofile] = useState({})

    const fetchMyProfile = () => {
        fetchAPIMyProfile().then((response) => {
            console.log(response)
            setMyprofile(response.data.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(fetchMyProfile, [])


    return (
        <div>
            <NavMentee activePage="home" />
            <div className="mentee-home-container">
                <div className="welcome-home">
                    <span className="user-home">
                        <p>Mentee</p>
                        <img className="img-infor-home" src={myProfile && myProfile.profilePic} alt="Banner" />
                        <p>{myProfile && myProfile.fullName}</p>
                    </span>
                    <span>
                        <h2>Chào mừng bạn đến với Tỏ Tê!<br /> Hãy khám phá ứng dụng nhé.</h2>
                        <p style={{ overflowWrap: 'break-word', marginLeft: '50px' }}>
                            Nếu bạn truy cập lần đầu hãy vào
                            <Link to='/my-profile?tab=updateProfile' className='profile-setting'> Profile Setting</Link>
                            để cập nhật profile để mentees có thể xem profile và apply package của bạn nhé.
                        </p>
                    </span>
                </div>
                <div className="mentor-propose-list">
                    <p className="propose">Đề xuất mentors:</p>
                    <Carousel className="mentors-propose" data-bs-theme="dark" interval={2000} controls={false} wrap={true}>
                        {mentorGroups.map((group, index) => (
                            <Carousel.Item key={index}>
                                <div className="mentor-group">
                                    {group.map(mentor => (
                                        <div className="mentor-card" key={mentor.id}>
                                            <div className="mentor-image">
                                                <img src={mentor.profilePic || img} className='img-mentor-profile' alt='img-mentor-profile' />
                                            </div>
                                            <div className="mentor-info">
                                                <p >{mentor.fullName}</p>
                                                <p>JOB: {mentor.jobTitle ? mentor.jobTitle : '....'}</p>
                                                <p><FontAwesomeIcon icon={faLocationDot} /> {mentor.company ? mentor.company : '...'}</p>

                                                <span>{mentor.bio}</span>
                                                <Link to={`/mentee/mentor-profile/${mentor.id}`} className='btn-view-profile'>Xem Profile</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                </div>
            </div>
            <Footer backgroundColor={'#274A79'} color={'#F9FDFF'} />
        </div>
    );
}
