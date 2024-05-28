// NavMentee.js

import React, { useState } from "react";
import "./NavMentee.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlaceOfWorship, faUserGraduate, faCommentDots, faEnvelope, faChevronDown, faA, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo/logo-tote.png";

export default function NavMentee({ activePage }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
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
                    <Link className={`nav-item ${activePage === 'application' ? 'active-page' : ''}`} to="/application">
                        <FontAwesomeIcon icon={faA} />
                        <div>Application</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'mentors' ? 'active-page' : ''}`} to="/mentee/my-mentors">
                        <FontAwesomeIcon icon={faUserGraduate} />
                        <div>Mentors</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'messenger' ? 'active-page' : ''}`} to="/mentee-messenger">
                        <FontAwesomeIcon icon={faCommentDots} />
                        <div>Tin nhắn</div>
                    </Link>
                    <Link className={`nav-item ${activePage === 'notification' ? 'active-page' : ''}`} to="/mentee-notification">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div>Thông báo</div>
                    </Link>
                </nav>
                <div className="infor-menu" onClick={toggleMenu}>
                    <img
                        className="infor-avatar"
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                    />
                    <FontAwesomeIcon icon={isMenuOpen ? faChevronUp : faChevronDown} className="chevron-icon" style={{ color: "#6ADBD7" }} />
                </div>
            </div>
            <div className="line"></div>
        </>
    );
}
