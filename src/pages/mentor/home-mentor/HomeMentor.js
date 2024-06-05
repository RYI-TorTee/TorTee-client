import React from 'react'
import NavMentor from '../../../components/Nav-mentor/NavMentor'
import './HomeMentor.scss'
import Footer from '../../../components/footer/Footer'
import image from "../../../assets/image/banner-img1.jpg";


export default function HomeMentor() {
    return (
        <div>
            <NavMentor activePage={'home'} />
            <div className="mentor-home-container">
                <div className="welcome-home">
                    <span className="user-home">
                        <p>Mentor</p>
                        <img className="img-infor-home" src={image} alt="Banner" />
                        <p>Họ và tên:</p>
                    </span>
                    <span>
                        <h2>Chào mừng bạn đến với Tỏ Tê! Hãy khám phá ứng dụng nhé.</h2>
                    </span>
                </div>

            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />


        </div>
    )
}
