// SignIn.js
import React, { useEffect, useState } from "react";
import HeaderHome from "../../components/header-home/HeaderHome";
import logo from "../../assets/logo/logo-tote.png";
import { Link, useNavigate } from "react-router-dom";
import './SignIn.scss';
import Footer from "../../components/footer/Footer";
import { useCookies } from "react-cookie";
import { RYI_URL } from '../../URL_BE/urlbackend';
import axiosInstance from '../../service/AxiosInstance';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth } from "../../routes/AuthContext";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (cookies.token) {
            navigate("/signin");
        } else {
            setIsLoading(false);
        }
    }, [cookies, navigate]);

    function handleSubmit(event) {
        event.preventDefault();

        axiosInstance
            .post(`${RYI_URL}/Auth/login`, { email, password })
            .then((res) => res.data)
            .then((data) => {
                if (data.isSuccess) {
                    console.log(data)
                    data.data.roles.forEach(role => {
                        setCookie("token", data.data.token, { path: "/" });
                        login(data.data.token);
                        if (role === 'Admin') {
                            localStorage.setItem("role", "Admin");
                            navigate("/admin-management");
                        } else if (role === 'Staff') {
                            localStorage.setItem("role", "Staff");
                            navigate("/staff-management");
                        } else if (role === 'Mentor') {
                            localStorage.setItem("role", "Mentor");
                            navigate("/mentor-homepage");
                        } else if (role === 'Mentee') {
                            localStorage.setItem("role", "Mentee");
                            navigate("/mentee-homepage");
                        } else {
                            setError(data.messages[0].content);
                        }
                    });
                } else {
                    setError(data.messages[0].content);
                }
            })
            .catch((err) => {
                navigate("/signin");
                if (err.response?.data?.errors?.Email) {
                    setError(err.response.data.errors.Email[0]);
                }
            });
    }

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    return (
        <div className="login-container">
            <HeaderHome>
                <Link className="signup-btn" to="/signup">Đăng ký</Link>
            </HeaderHome>
            <h1>Đăng nhập</h1>
            <div className="login-main">
                <div className="form-login">
                    <form action="" className="login-form" onSubmit={handleSubmit}>
                        <h2>Chào mừng bạn đến với Tỏ Tê</h2>
                        <div className="user">
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                className="input"
                                type="text"
                                value={email}
                                placeholder="Ex. a@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input
                                id="password"
                                className="input"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                            />
                        </div>
                        <small className="error-mess">{error}</small>
                        <button type="submit" className="login-button">Đăng nhập</button>
                        <div className="other-login">
                            <span className="seperate">
                                <span>----------------------------</span>
                                <span>Hoặc </span>
                                <span>----------------------------</span>
                            </span>
                            <Link className="forgot-pass">Quên mật khẩu?</Link>
                            <div>
                                <p className="no-account">Bạn chưa có tài khoản?</p>
                                <div>
                                    <Link className="signup-mentee" to="/signup/mentee">Sign up as mentee</Link> or
                                    <Link className="signup-mentor" to="/signup/mentor">apply to be a mentor</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="logo-login">
                    <img className="img-login" src={logo} alt="" />
                </div>
            </div>
            <Footer backgroundColor={'#6ADBD7'} color={'#274a79'}></Footer>
        </div>
    );
}

export default SignIn;
