import React from 'react';
import NavMentor from '../../../components/Nav-mentor/NavMentor';
import './HomeMentor.scss';
import Footer from '../../../components/footer/Footer';
import image from "../../../assets/image/banner-img1.jpg";
import { Link } from 'react-router-dom';

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
                        <p style={{ overflowWrap: 'break-word', marginLeft: '50px' }}>
                            Nếu bạn truy cập lần đầu hãy vào
                            <Link to='/mentor/my-profile?tab=updateProfile' className='profile-setting'> Profile Setting</Link>
                            để cập nhật profile để mentees có thể xem profile và apply package của bạn nhé.
                        </p>
                    </span>
                </div>
            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    );
}
