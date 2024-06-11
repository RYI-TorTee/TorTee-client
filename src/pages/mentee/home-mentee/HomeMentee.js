import React, { useEffect, useState } from "react";
import "./HomeMentee.scss";
import NavMentee from "../../../components/Nav-mentee/NavMentee";
import image from "../../../assets/image/banner-img1.jpg";
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../../../components/footer/Footer'
import { RYI_URL } from '../../../URL_BE/urlbackend'
import axiosInstance from "../../../service/AxiosInstance";

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
        axiosInstance.get(`${RYI_URL}/Mentor/browse-mentor`)
            .then(response => {
                setMentorRecommend(response.data.data);  // Đặt dữ liệu nhận được vào state
                console.log(response.data.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the mentors!", error);
            });
    }, []);


    return (
        <div>
            <NavMentee activePage="home" />
            <div className="mentee-home-container">
                <div className="welcome-home">
                    <span className="user-home">
                        <p>Mentee</p>
                        <img className="img-infor-home" src={image} alt="Banner" />
                        <p>Họ và tên:</p>
                    </span>
                    <span>
                        <h2>Chào mừng bạn đến với Tỏ Tê! Hãy khám phá ứng dụng nhé.</h2>
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
                                                <img src={mentor.image} alt={mentor.name} />
                                            </div>
                                            <div className="mentor-info">
                                                <h3>{mentor.name}</h3>
                                                <p>Nghề nghiệp: {mentor.occupation}</p>
                                                <p>Skill: {mentor.skills}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    );
}
