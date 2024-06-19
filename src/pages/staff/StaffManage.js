import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StaffManage.scss';
import Footer from '../../components/footer/Footer';
import logo from "../../assets/logo/logo-tote.png"; // Import logo-tote.png
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { RYI_URL } from '../../URL_BE/urlbackend';
import axiosInstance from '../../service/AxiosInstance';
import PDFLink from '../../components/pdf-link/PDFLink';
import ModalMentorDetail from '../../components/modal/modal-mentor-detail/ModalMentorDetail';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filter = params.get('Status') || 'ALL';
        setFilter(filter);
    }, [location.search]);

    const fetchAPI = () => {
        const params = {
            pageSize: 10,
            pageNumber: currentPage,
            IsDesc: true
        };

        let apiUrl = `${RYI_URL}/MentorApplication`;

        if (filter !== 'ALL') {
            apiUrl += `?Status=${filter}`;
        }

        axiosInstance.get(apiUrl, { params })
            .then(response => {
                setMentorApplication(response.data.data.data);
                setTotalRows(response.data.data.totalCount);
            })
            .catch(error => {
                console.error("There was an error fetching the mentor applications:", error);
            });
    };

    useEffect(() => {
        fetchAPI();
    }, [filter, currentPage]);

    const handleFilterChange = (filterValue) => {
        setCurrentPage(1);
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
            selector: (row, index) => index + 1 + (currentPage - 1) * 10,
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="home-header-container">
                <div>
                    <img
                        className="logo-tote"
                        src={logo}
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
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                paginationPerPage={10}
                                onChangePage={handlePageChange}
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
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                paginationPerPage={10}
                                onChangePage={handlePageChange}
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
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                paginationPerPage={10}
                                onChangePage={handlePageChange}
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
                                pagination
                                paginationServer
                                paginationTotalRows={totalRows}
                                paginationPerPage={10}
                                onChangePage={handlePageChange}
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
