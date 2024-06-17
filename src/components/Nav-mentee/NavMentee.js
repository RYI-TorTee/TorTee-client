import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavMentee.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faPlaceOfWorship,
    faUserGraduate,
    faCommentDots,
    faEnvelope,
    faChevronDown,
    faChevronUp,
    faRightFromBracket,
    faToolbox,
    faA
} from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo/logo-tote.png";
import axiosInstance from "../../service/AxiosInstance";
import { RYI_URL } from "../../URL_BE/urlbackend";
import altImg from '../../assets/image/noImage.png';
import { logout } from "../../services/service";


export default function NavMentee({ activePage }) {
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


    const handleProfileSetting = () => {
        navigate('/my-profile'); // Change this path to your profile setting route
    };




    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchAPI = () => {
        axiosInstance.get(`${RYI_URL}/Account/my-profile`)
            .then(response => {
                console.log(response);
                const data = response.data.data;
                setMyProfile(data);

            })
            .catch(error => {
                console.error("There was an error fetching profile data!", error);
            });
    };

    const handleLogout = () => {
        logout()
            .then(response => {
                console.log('Logout successful:', response);
                navigate('/signin'); // Redirect to the login page after logout
                // Delete the token cookie
                document.cookie = 'token=; path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure';
                // Clear local storage role
                localStorage.removeItem('role');
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    };

    useEffect(() => {
        fetchAPI();

    }, []);

    return (
        <>
            <div className="nav-mentee-container">
                <Link className="nav-item" to="/mentee-homepage">
                    <img
                        className="logo-tote"
                        src={logo}
                        alt="Logo Tote"
                    />
                </Link>
                <nav className="nav-items">
                    <Link className={`nav-item ${activePage === 'home' ? 'active-page' : ''}`} to="/mentee-homepage">
                        <FontAwesomeIcon icon={faHouse} />
                        <div>Home</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'workspace' ? 'active-page' : ''}`} to="/mentee-workspace">
                        <FontAwesomeIcon icon={faPlaceOfWorship} />
                        <div>My Workspace</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'application' ? 'active-page' : ''}`} to="/mentee/application">
                        <FontAwesomeIcon icon={faA} />
                        <div>Application</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'mentors' ? 'active-page' : ''}`} to="/mentee/my-mentors">
                        <FontAwesomeIcon icon={faUserGraduate} />
                        <div>Mentors</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'messenger' ? 'active-page' : ''}`} to="/message">
                        <FontAwesomeIcon icon={faCommentDots} />
                        <div>Messenger</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'notification' ? 'active-page' : ''}`} to="/mentee/notification">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div>Notification</div>
                    </Link>
                </nav>
                {myProfile && (
                    <div className="infor-menu" onClick={toggleMenu} ref={menuRef}>
                        <img
                            className="infor-avatar"
                            src={myProfile.profilePic ? myProfile.profilePic : altImg}
                            alt="User Avatar"
                        />
                        <FontAwesomeIcon icon={isMenuOpen ? faChevronUp : faChevronDown} className="chevron-icon" size="xs" style={{ color: "#6ADBD7" }} />
                    </div>
                )}
                {isMenuOpen && (
                    <div className="pop-up-logout" ref={menuRef}>
                        <p className="header-profile-name">{myProfile.fullName}</p>
                        <ul>
                            <li className="profile-setting" onClick={handleProfileSetting}>Profile <FontAwesomeIcon icon={faToolbox} /></li>
                            <li className="logout" onClick={handleLogout}>
                                Logout <FontAwesomeIcon icon={faRightFromBracket} />
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="line"></div>
        </>
    );
}
