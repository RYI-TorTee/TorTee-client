import React from "react";
import HeaderHome from "../../components/header-home/HeaderHome";
import logo from "../../assets/logo/logo-tote.png";
import { Link } from "react-router-dom";
import './SignIn.scss'

function SignIn() {
    return (
        <div className="login-container">
            <HeaderHome>
                <Link className="signin-btn" to="/signup">Đăng ký</Link>
            </HeaderHome>
            <h1>Sign In</h1>
            <div className="login-main">
                <div className="form-login">
                    <form action="" className="login-form">
                        <h2>Chào mừng bạn đến với Tỏ Tê</h2>
                        <div className="user">
                            <label htmlFor="email">Email hoặc số điện thoại</label>
                            <input
                                id="email"
                                className="input"
                                type="text"
                                placeholder="Ex. a@gmail.com"
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                id="password"
                                className="input"
                                type="password"
                            />
                        </div>
                        <small className="forgot-pass">Quên mật khẩu?</small>
                        <button className="login-button">Đăng nhập</button>
                        <div className="other-login">
                            <span className="seperate">
                                <span>---------------</span>
                                <span>Hoặc tiếp tục với</span>
                                <span>---------------</span>
                            </span>
                        </div>
                    </form>
                </div>
                <div className="logo-login">
                    <img className="img-login" src={logo} alt="" />
                </div>
            </div>
        </div>

    )
}

export default SignIn;