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

export default function NavMentee({ activePage }) {
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

    const handleProfileSetting = () => {
        navigate('/mentee/mentee-profile-setting'); // Change this path to your profile setting route
    };

    const handleLogout = () => {
        // Perform any logout logic here
        navigate('/logout'); // Change this path to your logout route
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
                    <Link className={`nav-item ${activePage === 'messenger' ? 'active-page' : ''}`} to="/mentee/messenger">
                        <FontAwesomeIcon icon={faCommentDots} />
                        <div>Tin nhắn</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'notification' ? 'active-page' : ''}`} to="/mentee/notification">
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
                    <FontAwesomeIcon icon={isMenuOpen ? faChevronUp : faChevronDown} className="chevron-icon" size="xs" style={{ color: "#6ADBD7" }} />
                </div>
                {isMenuOpen && (
                    <div className="pop-up-logout" ref={menuRef}>
                        <ul>
                            <li className="profile-setting" onClick={handleProfileSetting}>
                                Profile setting <FontAwesomeIcon icon={faToolbox} />
                            </li>
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
