import React, { useEffect, useState } from 'react';
import './MyprofileMentor.scss';
import Footer from '../../../components/footer/Footer';
import NavMentor from '../../../components/Nav-mentor/NavMentor';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const tabNameToIndex = {
    0: 'profile',
    1: 'updateProfile',
};

const indexToTabName = {
    'profile': 0,
    'updateProfile': 1,
};

export default function MyProfileMentee() {
    const [myProfile, setMyProfile] = useState({});
    const [formState, setFormState] = useState({
        profilePic: null,
        fullName: '',
        phoneNumber: '',
        bio: '',
        company: '',
        jobTitle: '',
    });
    const [value, setValue] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const fetchAPI = () => {
        axiosInstance.get(`${RYI_URL}/Account/my-profile`)
            .then(response => {
                console.log(response);
                const data = response.data.data;
                setMyProfile(data); // Access the nested data
                setFormState({
                    profilePic: data.profilePic,
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                    bio: data.bio,
                    company: data.company,
                    jobTitle: data.jobTitle,
                });
            })
            .catch(error => {
                console.error("There was an error fetching profile data!", error);
            });
    };

    useEffect(() => {
        fetchAPI();
        const query = new URLSearchParams(location.search);
        const tab = query.get('tab');
        if (tab !== null && indexToTabName[tab] !== undefined) {
            setValue(indexToTabName[tab]);
        }
    }, [location.search]); // Run effect on location.search change

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`?tab=${tabNameToIndex[newValue]}`);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setFormState({
            ...formState,
            profilePic: event.target.files[0],
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('profilePic', formState.profilePic);
        formData.append('fullName', formState.fullName);
        formData.append('phoneNumber', formState.phoneNumber);
        formData.append('bio', formState.bio);
        formData.append('company', formState.company);
        formData.append('jobTitle', formState.jobTitle);

        axiosInstance.put(`${RYI_URL}/Account`, formData)
            .then(response => {
                console.log(response);
                fetchAPI();
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error('There was an error registering!', error);
                }
            });
    };

    return (
        <div>
            <NavMentor />
            <div className='my-profile-detail-container'>
                <div className='header-my-profile'>
                    <img src={myProfile.profilePic} className='my-profile-detail-img' alt='Banner' />
                    <h2 className='account-name'>{myProfile.fullName}</h2>
                </div>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '40px' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Profile" {...a11yProps(0)} />
                        <Tab label="Update Profile" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className='body-my-profile'>
                            <div className='my-profile-main'>
                                <div className='my-profile-detail'>
                                    <h2>{myProfile.fullName}</h2>
                                    <p className='my-profile-intro'>Phone Number: {myProfile.phoneNumber}</p>
                                    <p className='my-profile-intro'>Bio: {myProfile.bio}</p>
                                    <p className='my-profile-intro'>Company: {myProfile.company}</p>
                                    <p className='my-profile-intro'>Job Title: {myProfile.jobTitle}</p>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='update-profile'>
                            <h2>Update Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='input-field'>
                                    <label>Profile Picture:</label>
                                    <input
                                        type="file"
                                        name="profilePic"
                                        onChange={handleFileChange}
                                    />
                                    {errors.profilePic && <span className="error-message">{errors.profilePic[0]}</span>}

                                </div>
                                <div className='input-field'>
                                    <label>Full Name:</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formState.fullName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.fullName && <span className="error-message">{errors.fullName[0]}</span>}
                                </div>
                                <div className='input-field'>
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formState.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.PhoneNumber && <span className="error-message">{errors.PhoneNumber[0]}</span>}

                                </div>
                                <div className='input-field'>
                                    <label>Bio:</label>
                                    <textarea
                                        name="bio"
                                        value={formState.bio}
                                        onChange={handleInputChange}
                                    />
                                    {errors.Bio && <span className="error-message">{errors.Bio[0]}</span>}

                                </div>
                                <div className='input-field'>
                                    <label>Company:</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formState.company}
                                        onChange={handleInputChange}
                                    />
                                    {errors.company && <span className="error-message">{errors.company[0]}</span>}

                                </div>
                                <div className='input-field'>
                                    <label>Job Title:</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={formState.jobTitle}
                                        onChange={handleInputChange}
                                    />
                                    {errors.jobTitle && <span className="error-message">{errors.jobTitle[0]}</span>}

                                </div>
                                <button type="submit">Save Changes</button>
                            </form>
                        </div>
                    </TabPanel>
                </Box>
            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    );
}
