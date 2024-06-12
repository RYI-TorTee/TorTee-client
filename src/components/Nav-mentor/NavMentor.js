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

export default function NavMentor({ activePage }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

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
        navigate('/mentor/my-profile'); // Change this path to your profile setting route
    };




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
                        <div>Tin nhắn</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'notification' ? 'active-page' : ''}`} to="/mentor/notification">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div>Thông báo</div>
                    </Link>
                </nav>
                <div className="infor-menu" onClick={toggleMenu} ref={menuRef}>
                    <img
                        className="infor-avatar"
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                    />
                    <FontAwesomeIcon icon={isMenuOpen ? faChevronUp : faChevronDown} className="chevron-icon" style={{ color: "#6ADBD7" }} />
                </div>

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
