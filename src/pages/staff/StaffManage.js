import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StaffManage.scss';
import Footer from '../../components/footer/Footer';
import logo from "../../assets/logo/logo-tote.png"; // Import logo-tote.png
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { RYI_URL } from '../../URL_BE/urlbackend';
import axios from 'axios';
import PDFLink from '../../components/pdf-link/PDFLink';
import ModalMentorDetail from '../../components/modal/modal-mentor-detail/ModalMentorDetail';
import axiosInstance from '../../service/AxiosInstance';

export default function StaffManage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState(new URLSearchParams(location.search).get('Status') || 'ALL');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const avatarRef = useRef(null);
    const [mentorApplication, setMentorApplication] = useState([]);
    const [selectedMentorId, setSelectedMentorId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filter = params.get('Status') || 'ALL';
        setFilter(filter);
    }, [location.search]);


    const fetchAPI = () => {
        if (filter === 'ALL') {
            axiosInstance.get(`${RYI_URL}/MentorApplication?pageSize=100&IsDesc=true`)
                .then(response => {
                    setMentorApplication(response.data.data.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the mentor application!", error);
                });
        } else {
            axiosInstance.get(`${RYI_URL}/MentorApplication?Status=${filter}&pageSize=100&IsDesc=true`)
                .then(response => {
                    setMentorApplication(response.data.data.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the mentor application!", error);
                });
        }
    }

    useEffect(fetchAPI, [filter]);


    const handleFilterChange = (filterValue) => {
        navigate(filterValue === 'ALL' ? '?' : `?Status=${filterValue}`);
    };


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            avatarRef.current && !avatarRef.current.contains(event.target)
        ) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const columns = [
        {
            name: 'Order',
            selector: (row, index) => index + 1,
            width: '80px',
            headerClass: 'custom-header'
        },
        {
            name: 'Name',
            selector: row => row.fullName,
            cell: row => <div className="wrap-cell">{row.fullName}</div>,
            headerClass: 'custom-header'
        },
        {
            name: 'Email',
            selector: row => row.email,
            cell: row => <div className="wrap-cell">{row.email}</div>,
            headerClass: 'custom-header'
        },
        {
            name: 'CV',
            selector: row => <PDFLink url={row.cv} />,
            cell: row => <PDFLink url={row.cv} />,
            headerClass: 'custom-header'
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: row => {
                switch (row.status) {
                    case 0:
                        return <div className="wrap-cell pending">Pending</div>;
                    case 1:
                        return <div className="wrap-cell accepted">Accepted</div>;
                    case 2:
                        return <div className="wrap-cell denied">Denied</div>;
                    default:
                        return <div className="wrap-cell">Unknown</div>;
                }
            },
            headerClass: 'custom-header'
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#274a79',
                color: '#fff',
                justifyContent: 'center', // Center align header cells horizontally
            },
        },
        cells: {
            style: {
                justifyContent: 'center', // Center align cells horizontally
                alignItems: 'center', // Center align cells vertically
                display: 'flex', // Ensure flexbox layout for vertical centering
            },
        },
        rows: {
            style: {
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: '#f0f0f0', // Change this to your desired hover color
                },
            },
        },
    };


    const handleRowClicked = (row) => {
        setSelectedMentorId(row.id); // Assuming 'id' is the unique identifier
        setShowModal(true);
    };

    return (
        <>
            <div className="home-header-container">
                <div>
                    <img
                        className="logo-tote"
                        src={logo} // Sử dụng biến 'logo' như một đường dẫn đến logo
                        alt="Logo Tote"
                    />
                </div>
                <div className="infor-menu" onClick={toggleMenu} ref={avatarRef}>
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
                            <li className="logout">Logout <FontAwesomeIcon icon={faRightFromBracket} /></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='staff-manage-container'>
                <div className='staff-management-filter'>
                    <div className='btn-filter-container'>
                        <button className={`btn-filter ${filter === 'ALL' ? 'active' : ''}`} onClick={() => handleFilterChange('ALL')}>ALL</button>
                        <button className={`btn-filter ${filter === 'PENDING' ? 'active' : ''}`} onClick={() => handleFilterChange('PENDING')}>PENDING</button>
                        <button className={`btn-filter ${filter === 'ACCEPTED' ? 'active' : ''}`} onClick={() => handleFilterChange('ACCEPTED')}>ACCEPTED</button>
                        <button className={`btn-filter ${filter === 'DENIED' ? 'active' : ''}`} onClick={() => handleFilterChange('DENIED')}>DENIED</button>
                    </div>
                    <div className='btn-sort'>
                        <span style={{ color: '#fff' }}>Sort By: AppliedDate</span>
                    </div>
                </div>
                <div className='CV-list-container'>
                    {filter === 'ALL' && (
                        <>
                            <h3>
                                All CVs
                            </h3>
                            <DataTable
                                columns={columns}
                                data={mentorApplication}
                                customStyles={customStyles}
                                onRowClicked={handleRowClicked}
                            />
                        </>
                    )}
                    {filter === 'PENDING' && (
                        <>
                            <h3>
                                CVs are PENDING
                            </h3>
                            <DataTable
                                columns={columns}
                                data={mentorApplication}
                                customStyles={customStyles}
                                onRowClicked={handleRowClicked}
                            />
                        </>
                    )}
                    {filter === 'ACCEPTED' && (
                        <>
                            <h3>
                                CVs are ACCEPTED
                            </h3>
                            <DataTable
                                columns={columns}
                                data={mentorApplication}
                                customStyles={customStyles}
                                onRowClicked={handleRowClicked}
                            />
                        </>
                    )}
                    {filter === 'DENIED' && (
                        <>
                            <h3>
                                CVs are DENIED
                            </h3>
                            <DataTable
                                columns={columns}
                                data={mentorApplication}
                                customStyles={customStyles}
                                onRowClicked={handleRowClicked}
                            />
                        </>
                    )}

                    {showModal && <ModalMentorDetail id={selectedMentorId} onClose={() => { setShowModal(false); fetchAPI(); }} />}

                </div>
            </div>
            <Footer backgroundColor={'#274a79'} color={'#fff'} />
        </>
    );
}
