import React from 'react'
import './SignupSuccess.scss'
import HeaderHome from '../../../../components/header-home/HeaderHome'
import Footer from '../../../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faFaceGrinWink, faFlag } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

export default function SignupSuccess() {
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
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    )
}
