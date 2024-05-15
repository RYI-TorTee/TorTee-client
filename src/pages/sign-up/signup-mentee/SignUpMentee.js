import React from 'react';
import './SignUpMentee.scss';
import HeaderHome from "../../../components/header-home/HeaderHome";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";

function SignUpMentee() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Điều này sẽ điều hướng người dùng về trang trước đó
    };

    return (
        <div className="sign-up-mentee_container">
            <HeaderHome>
                <Link className="signin-btn" to="/signin">Đăng nhập</Link>
            </HeaderHome>
            <button className="back-btn" onClick={handleBack}>Back</button>
            <Footer backgroundColor={'#6ADBD7'}></Footer>
        </div>
    );
}

export default SignUpMentee
