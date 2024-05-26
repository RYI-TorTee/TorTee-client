import React, { useState, useEffect } from 'react';
import './SignUpMentee.scss';
import HeaderHome from "../../../components/header-home/HeaderHome";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faCheck } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/logo/logo-tote.png'

function SignUpMentee() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        number: false
    });

    const handleBack = () => {
        navigate(-1); // Điều này sẽ điều hướng người dùng về trang trước đó
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    useEffect(() => {
        const { password } = formData;
        setPasswordValidations({
            length: password.length > 8,
            number: /\d/.test(password)
        });
    }, [formData.password]);

    const validate = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else {
            if (formData.password.length <= 8) newErrors.password = 'Password must be more than 8 characters';
            if (!/\d/.test(formData.password)) newErrors.password = newErrors.password ? `${newErrors.password}, and include a number` : 'Password must include a number';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Handle successful form submission here
            console.log('Form submitted successfully:', formData);
        }
    };

    return (
        <div className="sign-up-mentee_container">
            <HeaderHome />

            <div className='signup-mentee-container'>
                <h2>Sign up as a mentee</h2>
                <div className='sign-up_mentee'>
                    <div className='sign-up_img'>
                        <Link to='/'>
                            <img src={logo} alt='logo-img' />
                        </Link>
                    </div>
                    <form className='sign-up_form' onSubmit={handleSubmit}>
                        <div className='input-field input-first-name'>
                            <label className='label'>First name:</label>
                            <input
                                type='text'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`input ${errors.firstName ? 'input-error' : ''}`}
                            />
                            {errors.firstName && <span className='error-message'>{errors.firstName}</span>}
                        </div>
                        <div className='input-field input-last-name'>
                            <label className='label'>Last name:</label>
                            <input
                                type='text'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`input ${errors.lastName ? 'input-error' : ''}`}
                            />
                            {errors.lastName && <span className='error-message'>{errors.lastName}</span>}
                        </div>
                        <div className='input-field input-email'>
                            <label className='label'>Email:</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Ex: a@gmail.com'
                                value={formData.email}
                                onChange={handleChange}
                                className={`input ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && <span className='error-message'>{errors.email}</span>}
                        </div>
                        <div className='input-field input-password'>
                            <label className='label'>Password:</label>
                            <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className={`input ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <span className='error-message'>{errors.password}</span>}
                        </div>
                        <div className='password-requirements'>
                            <small className={`requirement ${passwordValidations.length ? 'valid' : ''}`}>
                                {passwordValidations.length && <FontAwesomeIcon icon={faCheck} />} Mật khẩu cần hơn 8 ký tự
                            </small><br />
                            <small className={`requirement ${passwordValidations.number ? 'valid' : ''}`}>
                                {passwordValidations.number && <FontAwesomeIcon icon={faCheck} />} Mật khẩu có số
                            </small>
                        </div>
                        <button className='sign-up_btn'>Đăng ký</button>
                        <div className='login-redirect'>
                            <p>Bạn đã có tài khoản? <Link to='/signin'>Đăng nhập</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <button className="back-btn" onClick={handleBack}><FontAwesomeIcon icon={faBackward} /> Back</button>
            <Footer backgroundColor={'#6ADBD7'} />
        </div>
    );
}

export default SignUpMentee;
