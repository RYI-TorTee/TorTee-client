import React, { useState } from 'react';
import axios from 'axios';
import './SignUpMentor.scss';
import HeaderHome from "../../../components/header-home/HeaderHome";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/logo/logo-tote.png';
import { RYI_URL } from '../../../URL_BE/urlbackend';

function SignUpMentor() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        category: '',
        company: '',
        jobTitle: '',
        bio: '',
        reason: '',
        achievement: '',
        cv: null
    });

    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});

    const handleBack = () => {
        navigate(-1); // Điều hướng về trang trước đó
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        const isEmptyEmail = email.trim() === '';

        if (isEmptyEmail) {
            return 'Email is required';
        } else if (!emailRegex.test(email)) {
            return 'Email should be a valid @gmail.com address';
        }

        return ''; // If no error
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else {
            const emailError = validateEmail(formData.email);
            if (emailError) {
                newErrors.email = emailError;
            }
        }
        if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.bio) newErrors.bio = 'Bio is required';
        if (!formData.reason) newErrors.reason = 'This field is required';
        if (!formData.achievement) newErrors.achievement = 'This field is required';
        if (!formData.cv) newErrors.cv = 'CV is required';

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cv') {
            setFormData({
                ...formData,
                [name]: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        // Clear the error for the current field
        setErrors({
            ...errors,
            [name]: name === 'email' ? validateEmail(value) : ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const data = new FormData();
            data.append('FirstName', formData.firstName);
            data.append('LastName', formData.lastName);
            data.append('Email', formData.email);
            data.append('PhoneNumber', formData.phoneNumber);
            data.append('Category', formData.category);
            data.append('Company', formData.company);
            data.append('JobTitle', formData.jobTitle);
            data.append('Bio', formData.bio);
            data.append('Reason', formData.reason);
            data.append('Achievement', formData.achievement);
            data.append('CV', formData.cv);

            axios.post(`${RYI_URL}/MentorApplication`, data)
                .then(response => {
                    const responseData = response.data;
                    console.log(response)
                    if (responseData.isSuccess) {
                        console.log('Form submitted successfully:', responseData);
                        navigate('/mentor-signup-success');
                    } else {
                        console.error('Submission failed:', responseData.messages);

                        setServerErrors(responseData.messages[0].content);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error.response && error.response.data && error.response.data.errors) {
                        setServerErrors(error.response.data.errors);
                    } else {
                        console.error('There was an error registering!', error);
                    }
                });
        }
    };


    return (
        <div className="sign-up-mentor_container">
            <HeaderHome />
            <div className='signup-mentor-container'>
                <h2>Sign up as a mentor</h2>
                <div className='sign-up_mentor'>
                    <div className='sign-up_img'>
                        <Link to='/'>
                            <img src={logo} alt='logo-img' />
                        </Link>
                    </div>
                    <form className='sign-up_form' onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <div className='input-field'>
                                <label className='label'>First name:</label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`input ${errors.firstName ? 'input-error' : ''}`}
                                />
                                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                                {serverErrors.FirstName && <span className="error-message">{serverErrors.FirstName[0]}</span>}
                            </div>
                            <div className='input-field'>
                                <label className='label'>Last name:</label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`input ${errors.lastName ? 'input-error' : ''}`}
                                />
                                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                                {serverErrors.LastName && <span className="error-message">{serverErrors.LastName[0]}</span>}
                            </div>
                        </div>
                        <div className='input-field'>
                            <label className='label'>Email:</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Ex: a@gmail.com'
                                value={formData.email}
                                onChange={handleChange}
                                className={`input ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                            {serverErrors.Email && <span className="error-message">{serverErrors.Email[0]}</span>}
                        </div>
                        <div className='input-group'>
                            <div className='input-field'>
                                <label className='label'>Job Title:</label>
                                <input
                                    type='text'
                                    name='jobTitle'
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    className={`input ${errors.jobTitle ? 'input-error' : ''}`}
                                />
                                {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
                                {serverErrors.JobTitle && <span className="error-message">{serverErrors.JobTitle[0]}</span>}
                            </div>
                            <div className='input-field'>
                                <label className='label'>Company (optional):</label>
                                <input
                                    type='text'
                                    name='company'
                                    value={formData.company}
                                    onChange={handleChange}
                                    className='input'
                                />
                            </div>
                        </div>
                        <div className='input-field'>
                            <label className='label'>Phone Number:</label>
                            <input
                                type='text'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`input ${errors.phoneNumber ? 'input-error' : ''}`}
                            />
                            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                            {serverErrors.PhoneNumber && <span className="error-message">{serverErrors.PhoneNumber[0]}</span>}
                        </div>
                        <div className='input-field'>
                            <label className='label'>Category:</label>
                            <input
                                type='text'
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                className={`input ${errors.category ? 'input-error' : ''}`}
                            />
                            {errors.category && <span className="error-message">{errors.category}</span>}
                            {serverErrors.Category && <span className="error-message">{serverErrors.Category[0]}</span>}
                        </div>

                        <div className='input-field'>
                            <label className='label'>Bio:</label>
                            <input
                                type='text'
                                name='bio'
                                value={formData.bio}
                                onChange={handleChange}
                                className={`input ${errors.bio ? 'input-error' : ''}`}
                            />
                            {errors.bio && <span className="error-message">{errors.bio}</span>}
                            {serverErrors.Bio && <span className="error-message">{serverErrors.Bio[0]}</span>}
                        </div>
                        <div className='input-field'>
                            <label className='label'>Why do you want to become a mentor? (Not publicly visible)</label>
                            <textarea
                                name='reason'
                                value={formData.reason}
                                onChange={handleChange}
                                className={`textarea ${errors.reason ? 'input-error' : ''}`}
                            />
                            {errors.reason && <span className="error-message">{errors.reason}</span>}
                            {serverErrors.Reason && <span className="error-message">{serverErrors.Reason[0]}</span>}
                        </div>
                        <div className='input-field'>
                            <label className='label'>What, in your opinion, has been your greatest achievement so far? (Not publicly visible)</label>
                            <textarea
                                name='achievement'
                                value={formData.achievement}
                                onChange={handleChange}
                                className={`textarea ${errors.achievement ? 'input-error' : ''}`}
                            />
                            {errors.achievement && <span className="error-message">{errors.achievement}</span>}
                            {serverErrors.Achievement && <span className="error-message">{serverErrors.Achievement[0]}</span>}
                        </div>
                        <div className='input-field'>
                            <label className='label'>Upload CV:</label>
                            <input
                                type='file'
                                name='cv'
                                onChange={handleChange}
                                className={`input ${errors.cv ? 'input-error' : ''}`}
                            />
                            {errors.cv && <span className="error-message">{errors.cv}</span>}
                            {serverErrors.CV && <span className="error-message">{serverErrors.CV[0]}</span>}
                        </div>
                        {Object.keys(serverErrors).map(key => (
                            <span key={key} className="error-message">{serverErrors[key]}</span>
                        ))}

                        <button className='sign-up_btn'>Sign Up</button>
                        <div className='login-redirect'>
                            <p>Bạn đã có tài khoản? <Link to='/signin'>Đăng nhập</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <button className="back-btn" onClick={handleBack}><FontAwesomeIcon icon={faBackward} /> Back</button>
            <Footer backgroundColor={'#6ADBD7'} color={'#274a79'} />
        </div>
    );
}

export default SignUpMentor;
