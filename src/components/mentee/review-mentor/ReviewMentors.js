import React, { useEffect, useState } from 'react';
import './ReviewMentor.scss';
import img from '../../../assets/image/banner-img1.jpg';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import StarRatingComponent from 'react-star-rating-component';

export default function ReviewMentors({ mentorId }) {
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbackApi = () => {
        axiosInstance.get(`${RYI_URL}/Feedback/${mentorId}?PageIndex=1&&PageSize=100`)
            .then((res) => {
                console.log(res);
                setFeedbacks(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(fetchFeedbackApi, [mentorId]);

    // Data fixed cứng
    const fixedFeedback = {
        name: "Luis",
        date: "2023-06-21",
        rating: 4, // Xếp hạng sao từ 1 đến 5
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };

    return (
        <div className='review-mentor-container'>
            <h2 className='review-title'>What mentees say</h2>
            <div className='review-mentor-list'>
                <div className='review-mentor-item'>
                    <div className='mentee-review-infor-container'>
                        <img className='mentee-review-img' src={img} alt="Mentee" />
                        <div className='mentee-review-infor'>
                            <h4>{fixedFeedback.name}</h4>
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={fixedFeedback.rating}
                                editing={false}
                                starColor="#ffd700" // Màu vàng cho các ngôi sao
                                emptyStarColor="#ccc" // Màu xám cho các ngôi sao trống
                            />
                            <div style={{ marginRight: '20px' }}>{fixedFeedback.date}</div>
                        </div>
                    </div>
                    <p className='mentee-review-content'>
                        Mentor is very dedicated and very good. <br />
                        {fixedFeedback.comment}
                    </p>
                </div>
            </div>
        </div>
    );
}
