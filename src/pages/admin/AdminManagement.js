import React, { useEffect, useState } from "react";
import "./AdminManagement.scss";
import logo from "../../assets/logo/logo-tote.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardUser,
    faMagnifyingGlass,
    faMoneyBillTransfer,
    faRightFromBracket,
    faUser,
    faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import {
    getMentorsAdmin,
    getStaffsAdmin,
    getTransactionAdmin,
    getUsersAdmin,
    logout,
} from "../../services/service";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import altImg from "../../assets/image/noImage.png";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ModalAddStaff from "../../components/modal/modal-add-staff/ModalAddStaff";
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
        date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
        date.getSeconds()
    ).padStart(2, "0")}`;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#76ABAE",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

//User management
const UserManagement = () => {
    const [users, setUsers] = useState([]);

    const fetchUsersAPI = () => {
        getUsersAdmin()
            .then((response) => {
                console.log("user", response.data);
                setUsers(response.data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchUsersAPI();
    }, []);

    return (
        <div className="management-container">
            <h2> Users Management</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Full Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Phone Number</StyledTableCell>
                            <StyledTableCell align="center">Profile Picture</StyledTableCell>
                            {/* <StyledTableCell align="center">Job Title</StyledTableCell>
                            <StyledTableCell align="center">Company</StyledTableCell> */}
                            <StyledTableCell align="center">Role</StyledTableCell>
                            <StyledTableCell align="center">Created Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.fullName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {user.phoneNumber}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img
                                        className="pro-pic"
                                        src={user.profilePic ? user.profilePic : altImg}
                                        alt={user.fullName}
                                    />
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">{user.jobTitle}</StyledTableCell>
                                <StyledTableCell align="center">{user.company}</StyledTableCell> */}
                                <StyledTableCell align="center">
                                    {user.userRoles.map((role) => {
                                        return <p style={{ margin: "0px" }}>{role.name}</p>;
                                    })}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {formatDate(user.createdDate)}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

//Mentor Management
const MentorManagement = () => {
    const [mentors, setMentors] = useState([]);

    const fetchMentorsAPI = () => {
        getMentorsAdmin()
            .then((response) => {
                console.log("mentor", response.data);
                setMentors(response.data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchMentorsAPI();
    }, []);

    return (
        <div className="management-container">
            <h2 className="admin-title">Mentors Management </h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Full Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Phone Number</StyledTableCell>
                            <StyledTableCell align="center">Profile Picture</StyledTableCell>
                            <StyledTableCell align="center">Job Title</StyledTableCell>
                            <StyledTableCell align="center">Company</StyledTableCell>
                            <StyledTableCell align="center">Bio</StyledTableCell>
                            <StyledTableCell align="center">Created Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mentors.map((mentor) => (
                            <StyledTableRow key={mentor.id}>
                                <StyledTableCell component="th" scope="row">
                                    {mentor.fullName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{mentor.email}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {mentor.phoneNumber}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img
                                        className="pro-pic"
                                        src={mentor.profilePic}
                                        alt={mentor.fullName}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {mentor.jobTitle}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {mentor.company}
                                </StyledTableCell>
                                <StyledTableCell align="center">{mentor.bio}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {formatDate(mentor.createdDate)}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

//transaction management
const TransactionManagement = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactionsAPI = () => {
        getTransactionAdmin()
            .then((response) => {
                console.log("transaction", response.data);
                setTransactions(response.data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchTransactionsAPI();
    }, []);

    return (
        <div className="management-container">
            <h2 className="admin-title">Transactions Management </h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Created Person Id</StyledTableCell>
                            <StyledTableCell>Created Person Name</StyledTableCell>
                            <StyledTableCell align="center">Mentor Name</StyledTableCell>
                            <StyledTableCell align="center">Total</StyledTableCell>
                            <StyledTableCell align="center">Created Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <StyledTableRow key={transaction.id}>
                                <StyledTableCell>{transaction.menteeId}</StyledTableCell>
                                <StyledTableCell>{transaction.menteeName}</StyledTableCell>
                                <StyledTableCell>{transaction.mentorName}</StyledTableCell>
                                <StyledTableCell>{transaction.total}</StyledTableCell>
                                <StyledTableCell>
                                    {formatDate(transaction.createdDate)}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

//staff management
const StaffManagement = () => {
    const [staffs, setStaffs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchStaffsAPI = () => {
        getStaffsAdmin()
            .then((response) => {
                console.log("staff", response.data);
                setStaffs(response.data.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchStaffsAPI();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        fetchStaffsAPI();
    };

    return (
        <div className="management-container">
            <div className="staff-head">
                <h2 className="admin-title">Staffs Management </h2>
                <Button onClick={handleOpenModal}>Add Staff</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Full Name</StyledTableCell>
                            <StyledTableCell align="center">UserName</StyledTableCell>
                            <StyledTableCell align="center">Phone Number</StyledTableCell>
                            <StyledTableCell align="center">Random Password</StyledTableCell>
                            <StyledTableCell align="center">Created Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffs && staffs.map((staff) => (
                            <StyledTableRow key={staff.id}>
                                <StyledTableCell component="th" scope="row">
                                    {staff.fullName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {staff.userName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {staff.phoneNumber}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {staff.passAutoGenerate}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {formatDate(staff.createdDate)}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {showModal && <ModalAddStaff onClose={handleCloseModal} />}
        </div>
    );
};

export default function AdminManagement() {
    const [activeTab, setActiveTab] = useState("user");
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeTab) {
            case "user":
                return <UserManagement />;
            case "mentor":
                return <MentorManagement />;
            case "transaction":
                return <TransactionManagement />;
            case "staff":
                return <StaffManagement />;
            default:
                return <UserManagement />;
        }
    };

    const handleLogout = () => {
        logout()
            .then((response) => {
                console.log("Logout successful:", response);
                navigate("/signin");

                //delete cookie
                document.cookie =
                    "token=; path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure";
                // Clear local storage role
                localStorage.removeItem("role");
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    return (
        <div className="admin-management">
            <div className="sidebar">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <span>TỎ TÊ</span>
                </div>
                <div
                    className={activeTab === "user" ? "active" : ""}
                    onClick={() => setActiveTab("user")}
                >
                    <FontAwesomeIcon className="font-awesome-icon" icon={faUser} /> User
                    Management
                </div>
                <div
                    className={activeTab === "mentor" ? "active" : ""}
                    onClick={() => setActiveTab("mentor")}
                >
                    <FontAwesomeIcon
                        className="font-awesome-icon"
                        icon={faUserGraduate}
                    />{" "}
                    Mentor Management
                </div>
                <div
                    className={activeTab === "transaction" ? "active" : ""}
                    onClick={() => setActiveTab("transaction")}
                >
                    <FontAwesomeIcon
                        className="font-awesome-icon"
                        icon={faMoneyBillTransfer}
                    />{" "}
                    Transaction Management
                </div>
                <div
                    className={activeTab === "staff" ? "active" : ""}
                    onClick={() => setActiveTab("staff")}
                >
                    <FontAwesomeIcon
                        className="font-awesome-icon"
                        icon={faClipboardUser}
                    />{" "}
                    Staff Management
                </div>
                <div
                    className="logout-btn"
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Logout <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>
            <div className="content">
                <div className="search-bar">
                    <InputGroup className="mb-3 search-input-admin">
                        <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search..."
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <div>
                        <img
                            className="infor-avatar"
                            // src={myProfile.profilePic ? myProfile.profilePic : altImg}
                            src={altImg}
                            alt="User Avatar"
                        />
                    </div>
                </div>
                <div className="content-item">{renderContent()}</div>
            </div>
        </div>
    );
}
