import React from "react";
import './HomePage.scss'
import HeaderHome from "../../components/header-home/HeaderHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
    const customOptions = {}; // Đặt tùy chọn của bạn ở đây

    const slidesStore = [ // Thay bằng dữ liệu của bạn
        { src: "url_of_image1", alt: "alt_text_1", title: "title_1" },
        { src: "url_of_image2", alt: "alt_text_2", title: "title_2" },
        // Thêm các mục slide khác nếu cần thiết
    ];

    return (
        <div className="home_container">
            <HeaderHome />
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
                </div>
            </div>
        </div>
    );
}

export default HomePage;
