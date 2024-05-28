import React, { useState } from 'react';
import './SignUpMentor.scss';
import HeaderHome from "../../../components/header-home/HeaderHome";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/logo/logo-tote.png';

function SignUpMentor() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        company: '',
        phone: '',
        category: '',
        skills: '',
        bio: '',
        linkedIn: '',
        whyMentor: '',
        greatestAchievement: ''
    });

    const [errors, setErrors] = useState({});

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
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.skills) newErrors.skills = 'Skills are required';
        if (!formData.bio) newErrors.bio = 'Bio is required';
        if (!formData.linkedIn) newErrors.linkedIn = 'LinkedIn URL is required';
        if (!formData.whyMentor) newErrors.whyMentor = 'This field is required';
        if (!formData.greatestAchievement) newErrors.greatestAchievement = 'This field is required';

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

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
            // Handle successful form submission here
            console.log('Form submitted successfully:', formData);
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
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                className={`input ${errors.phone ? 'input-error' : ''}`}
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>
                        <div className='input-field'>
                            <label className='label'>Category:</label>
                            <select
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                className={`input-category ${errors.category ? 'input-error' : ''}`}
                            >
                                <option value=''>Select a category</option>
                                <option value='category1'>Category 1</option>
                                <option value='category2'>Category 2</option>
                                {/* Add more categories as needed */}
                            </select>
                            {errors.category && <span className="error-message">{errors.category}</span>}
                        </div>
                        <div className='input-field'>
                            <label className='label'>Skills:</label>
                            <input
                                type='text'
                                name='skills'
                                value={formData.skills}
                                onChange={handleChange}
                                className={`input ${errors.skills ? 'input-error' : ''}`}
                            />
                            {errors.skills && <span className="error-message">{errors.skills}</span>}
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
                        </div>
                        <div className='input-field'>
                            <label className='label'>LinkedIn URL:</label>
                            <input
                                type='text'
                                name='linkedIn'
                                value={formData.linkedIn}
                                onChange={handleChange}
                                className={`input ${errors.linkedIn ? 'input-error' : ''}`}
                            />
                            {errors.linkedIn && <span className="error-message">{errors.linkedIn}</span>}
                        </div>
                        <div className='input-field'>
                            <label className='label'>Why do you want to become a mentor? (Not publicly visible)</label>
                            <textarea
                                name='whyMentor'
                                value={formData.whyMentor}
                                onChange={handleChange}
                                className={`textarea ${errors.whyMentor ? 'input-error' : ''}`}
                            />
                            {errors.whyMentor && <span className="error-message">{errors.whyMentor}</span>}
                        </div>
                        <div className='input-field'>
                            <label className='label'>What, in your opinion, has been your greatest achievement so far? (Not publicly visible)</label>
                            <textarea
                                name='greatestAchievement'
                                value={formData.greatestAchievement}
                                onChange={handleChange}
                                className={`textarea ${errors.greatestAchievement ? 'input-error' : ''}`}
                            />
                            {errors.greatestAchievement && <span className="error-message">{errors.greatestAchievement}</span>}
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
                        </div>
                        <button className='sign-up_btn'>Sign Up</button>
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

export default SignUpMentor;
