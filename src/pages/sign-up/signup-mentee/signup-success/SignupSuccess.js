import React, { useEffect } from 'react';
import './SignupSuccess.scss';
import HeaderHome from '../../../../components/header-home/HeaderHome';
import Footer from '../../../../components/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faFaceGrinWink, faFlag } from '@fortawesome/free-regular-svg-icons';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import axiosInstance from '../../../../service/AxiosInstance';
import { RYI_URL } from '../../../../URL_BE/urlbackend';

export default function SignupSuccess() {
    const location = useLocation(); // Sử dụng useLocation để lấy thông tin URL

    // Hàm để lấy các query parameters từ URL
    const getQueryParams = () => {
        return new URLSearchParams(location.search);
    };

    // Lấy userId và token từ query parameters
    const userId = getQueryParams().get('userId');
    const token = getQueryParams().get('token');

    const fetchConfirmAPI = () => {
        axiosInstance.get(`${RYI_URL}/Auth/confirm-email`, {
            params: {
                userId: userId,
                token: token
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.error('Error:', e);
            });
    };

    useEffect(fetchConfirmAPI, [userId, token]); // Chạy fetchConfirmAPI khi userId hoặc token thay đổi

    return (
        <div style={{ height: '100%', backgroundColor: '#274a79' }}>
            <HeaderHome />
            <div className='signup-success-container'>
                <div className='signup-success-background'>
                    <h2>Chúc mừng bạn đã đăng ký thành công! <FontAwesomeIcon icon={faThumbsUp} /></h2>
                    <p><FontAwesomeIcon icon={faFlag} /> Bạn còn thêm một bước nữa để hoàn thành.</p>
                    <p><small>Hãy vào Email bạn đã đăng ký để xác nhận thành viên và quay lại trang</small> <Link className='btnsignin' to="/signin">đăng nhập</Link> <small>để khám phá ứng dụng nhé.</small></p>
                    <p>Thank you so much. <FontAwesomeIcon icon={faFaceGrinWink} /></p>
                </div>
            </div>
            <Footer backgroundColor={'#274A79'} color={'#F9FDFF'} />
        </div>
    );
}
