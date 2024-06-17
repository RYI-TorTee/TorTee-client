// NavMentor.js

import React, { useState, useEffect, useRef } from "react";
import "./NavMentor.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse, faPlaceOfWorship, faCommentDots, faEnvelope, faChevronDown, faA, faChevronUp,
    faRightFromBracket,
    faToolbox
} from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo/logo-tote.png";
import axiosInstance from "../../service/AxiosInstance";
import { RYI_URL } from "../../URL_BE/urlbackend";
import altImg from '../../assets/image/noImage.png';


export default function NavMentor({ activePage }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [myProfile, setMyProfile] = useState({});

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleProfileSetting = () => {
        navigate('/my-profile'); // Change this path to your profile setting route
    };

    const fetchAPI = () => {
        axiosInstance.get(`${RYI_URL}/Account/my-profile`)
            .then(response => {
                console.log(response);
                const data = response.data.data;
                setMyProfile(data); // Access the nested data

            })
            .catch(error => {
                console.error("There was an error fetching profile data!", error);
            });
    };

    useEffect(() => {
        fetchAPI();

    }, []);



    return (
        <>
            <div className="nav-mentee-container">
                <Link className="nav-item" to="/mentor-homepage">
                    <img
                        className="logo-tote"
                        src={logo}
                        alt="Logo Tote"
                    />
                </Link>
                <nav className="nav-items">
                    <Link className={`nav-item ${activePage === 'home' ? 'active-page' : ''}`} to="/mentor-homepage">
                        <FontAwesomeIcon icon={faHouse} />
                        <div>Home</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'workspace' ? 'active-page' : ''}`} to="/mentor/workspace">
                        <FontAwesomeIcon icon={faPlaceOfWorship} />
                        <div>My Workspace</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'application' ? 'active-page' : ''}`} to="/mentor/application">
                        <FontAwesomeIcon icon={faA} />
                        <div>Application</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'messenger' ? 'active-page' : ''}`} to="/mentor/message">
                        <FontAwesomeIcon icon={faCommentDots} />
                        <div>Messenger</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'notification' ? 'active-page' : ''}`} to="/mentor/notification">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div>Notification</div>
                    </Link>
                </nav>
                {myProfile && (<div className="infor-menu" onClick={toggleMenu} ref={menuRef}>
                    <img
                        className="infor-avatar"
                        src={myProfile.profilePic ? myProfile.profilePic : altImg}
                        alt="User Avatar"
                    />
                    <FontAwesomeIcon icon={isMenuOpen ? faChevronUp : faChevronDown} className="chevron-icon" style={{ color: "#6ADBD7" }} />
                </div>)
                }

                {isMenuOpen && (
                    <div className="pop-up-logout" ref={menuRef}>
                        <ul>
                            <li className="profile-setting" onClick={handleProfileSetting}>Profile<FontAwesomeIcon icon={faToolbox} /></li>
                            <li className="logout">Logout <FontAwesomeIcon icon={faRightFromBracket} /></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="line"></div>
        </>
    );
}
