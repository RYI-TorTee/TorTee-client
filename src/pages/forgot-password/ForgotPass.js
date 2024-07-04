import React, { useState } from 'react';
import './ForgotPass.scss';
import HeaderHome from '../../components/header-home/HeaderHome';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import axios from 'axios';
import { RYI_URL } from '../../URL_BE/urlbackend'; // Import URL from your backend configuration file
import { Spinner } from 'react-bootstrap';

export default function ForgotPass() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${RYI_URL}/Auth/forgot-password`, { email });
            setIsSubmitted(true);
            setError('');
        } catch (err) {
            setError('Đã xảy ra lỗi, vui lòng thử lại.');
            setIsSubmitted(false);
        }
    };

    return (
        <>
            <HeaderHome>
                <Link className="login-btn" to="/signin">
                    Đăng nhập
                </Link>
                <Link className="signin-btn" to="/signup">
                    Đăng ký
                </Link>
            </HeaderHome>
            <div className='forgot-password'>
                <h1 className='forgot-password-title'>
                    Bạn quên mật khẩu? Hãy nhập email để nhận link và thực hiện thay đổi mật khẩu.
                </h1>
                {isSubmitted ? (
                    <p className='forgot-password-message'>
                        Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn.
                    </p>
                ) : (
                    <form className='forgot-password-form' onSubmit={handleSubmit}>
                        <input
                            type='email'
                            placeholder='Nhập email của bạn'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type='submit'>Gửi email
                            {!isSubmitted && <Spinner animation="border" />}
                        </button>
                        {error && <p className='forgot-password-error'>{error}</p>}
                    </form>
                )}
            </div>
            <Footer backgroundColor={'#6ADBD7'} color={'#274a79'}></Footer>
        </>
    );
}
