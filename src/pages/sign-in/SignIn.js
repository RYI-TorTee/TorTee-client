import React, { useEffect, useState } from "react";
import HeaderHome from "../../components/header-home/HeaderHome";
import logo from "../../assets/logo/logo-tote.png";
import { Link, useNavigate } from "react-router-dom";
import './SignIn.scss'
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useCookies } from "react-cookie";
import { RYI_URL } from '../../URL_BE/urlbackend'

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (document.cookie.includes("user")) {
            navigate("/admin");
        } else {
            setIsLoading(false); // Kiểm tra user đã hoàn thành, set isLoading thành false
        }
    }, []);

    const [error, setError] = useState("");

    const [cookies, setCookie] = useCookies();
    function handleSubmit(event) {
        event.preventDefault();

        axios
            .post(`${RYI_URL}/Auth/login`, {
                email,
                password,
            })
            .then((res) => res.data)
            .then((data) => {
                if (data.statusCode === 200 && data.data.roles[0] === 'admin') {
                    setCookie("token", data.data.token, { path: "/" });
                    // setCookie("user", data.data[0], { path: "/" });
                    // navigate("/mentee-homepage")
                } else if (data.statusCode === 200 && data.data.roles[0] === 'staff') {
                    setCookie("token", data.data.token, { path: "/" });
                    // setCookie("user", data.data[0], { path: "/" });
                    // navigate("/mentor-homepage")
                } else if (data.statusCode === 200 && data.data.roles[0] === 'Mentor') {
                    setCookie("token", data.data.token, { path: "/" });
                    // setCookie("user", data.data[0], { path: "/" });
                    navigate("/mentor-homepage")
                } else if (data.statusCode === 200 && data.data.roles[0] === 'Mentee') {
                    setCookie("token", data.data.token, { path: "/" });
                    // setCookie("user", data.data[0], { path: "/" });
                    navigate("/mentee-homepage")
                }
                else {
                    setError(data.messages[0].content);
                }
            })
            .catch((err) => {
                navigate("/signin");
                const errorMessage = err.response.data.errors.Email[0]
                setError(errorMessage)

            });


    }

    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị trạng thái chờ
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
            <Footer backgroundColor={'#6ADBD7'}></Footer>
        </div>

    )
}

export default SignIn;