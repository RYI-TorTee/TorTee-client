import React from "react";
import './HomePage.scss'
import HeaderHome from "../../components/header-home/HeaderHome";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo/logo-tote.png";
import img1 from "../../assets/image/banner-img1.jpg";
import img2 from "../../assets/image/banner-img2.jpg";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'

function HomePage() {
    const data = [
        { img: logo, title: '' },
        { img: img1, title: '' },
        { img: img2, title: '' }
    ]

    return (
        <div className="home_container">
            <HeaderHome >
                <Link className="login-btn" to="/signin">Đăng nhập</Link>
                <Link className="signin-btn" to="/signup">Đăng ký</Link>
            </HeaderHome>
            <div className="home_banner">
                <div className="banner-intro">
                    <h1>Tỏ Tê</h1>
                    <p> <FontAwesomeIcon icon={faStarOfLife} />
                        <span>
                            Giúp bạn khám phá và nắm bắt các cơ hội, vượt qua các ranh giới và mở
                            ra những cánh cửa mới. Biến ước mơ của bạn thành hiện thực nhờ trải
                            nghiệm thực tế, sự hướng dẫn của chuyên gia và cộng đồng .
                        </span>
                    </p>
                </div>
                <div className="banner-img">
                    <Carousel data-bs-theme="dark" interval={2000} controls={false} wrap={true}>
                        {data.map((item, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={item.img}
                                    alt={`Slide ${index + 1}`}
                                />
                                <Carousel.Caption>
                                    <h5>{item.title}</h5>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
            <Link to="/mentee-homepage" style={{ margin: "20px" }}>mentee</Link>
            <Link to="">mentor</Link>
            <Footer backgroundColor={'#fff'} />
        </div>
    );
}

export default HomePage;
