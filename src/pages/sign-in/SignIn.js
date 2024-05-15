import React from "react";
import HeaderHome from "../../components/header-home/HeaderHome";
import logo from "../../assets/logo/logo-tote.png";
import { Link } from "react-router-dom";
import './SignIn.scss'
import Footer from "../../components/footer/Footer";

function SignIn() {
    return (
        <div className="login-container">
            <HeaderHome>
                <Link className="signup-btn" to="/signup">Đăng ký</Link>
            </HeaderHome>
            <h1>Đăng nhập</h1>
            <div className="login-main">
                <div className="form-login">
                    <form action="" className="login-form">
                        <h2>Chào mừng bạn đến với Tỏ Tê</h2>
                        <div className="user">
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                className="input"
                                type="text"
                                placeholder="Ex. a@gmail.com"
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input
                                id="password"
                                className="input"
                                type="password"
                            />
                        </div>
                        <button className="login-button">Đăng nhập</button>
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