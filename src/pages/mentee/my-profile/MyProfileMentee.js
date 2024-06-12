import React, { useEffect, useState } from 'react'
import './MyprofileMentee.scss'
import Footer from '../../../components/footer/Footer';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import bannerImg from '../../../assets/image/banner-img1.jpg';
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
    const [value, setValue] = useState(0);
    const location = useLocation();
    const navigate = useNavigate()

    const fetchAPI = () => {
        axiosInstance.get(`${RYI_URL}/Account/my-profile`)
            .then(response => {
                console.log(response);
                setMyProfile(response.data.data); // Access the nested data
                console.log(response.data.data); // Log the correct data
            })
            .catch(error => {
                console.error("There was an error fetching profile data!", error);
            });
    };

    useEffect(() => {
        fetchAPI();
    }, []); // Empty dependency array ensures this effect runs only once

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


    return (
        <div>
            <NavMentee />
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
                                    <p className='my-profile-intro'>Email: {myProfile.email}</p>
                                    <p className='my-profile-intro'>Job Title: {myProfile.jobTitle}</p>
                                </div>
                            </div>
                            <div className='my-profile-about'>
                                <h2>About</h2>
                                <p className='my-about-content'>{myProfile.about}</p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='update-profile'>
                            <h2>Update Profile</h2>
                            <p>This is where you can update your profile information.</p>
                            {/* Add form fields and logic to handle profile updates here */}
                        </div>
                    </TabPanel>
                </Box>
            </div>
            <Footer backgroundColor={'#6adbd7'} color={'#274a79'} />
        </div>
    );
}
