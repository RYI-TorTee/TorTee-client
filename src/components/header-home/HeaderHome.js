import React from "react";
import logo from "../../assets/logo/logo-tote.png"; // Import đường dẫn đến file logo-tote.png
import './HeaderHome.scss'

function HeaderHome() {
    const backToHome = () => {

    }

    return (
        <div className="home-header-container">
            <img
                className="logo-tote"
                src={logo} // Sử dụng biến 'logo' như một đường dẫn đến logo
                alt="Logo Tote"
                onClick={backToHome} // Xử lý sự kiện click để quay lại trang chủ
            />
            <div className="header-right-side">

            </div>
        </div>
    );
}

export default HeaderHome;
