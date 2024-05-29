import React from 'react';
import "./BrowseMentor.scss";
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import img from "../../../assets/image/banner-img2.jpg"
import Footer from "./../../../components/footer/Footer"

export default function BrowseMentor() {
    return (
        <>
            <NavMentee activePage="mentors" />
            <div className='browse-mentor-container'>

                <div className='filter-mentor'>
                    <p className='filter-title'>Filter</p>
                </div>

                <div className='mentors-list-container'>
                    <h1 className='mentor-community-title'>MENTOR COMMUNITY</h1>
                    <div className='mentors-list'>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <button className='btn-view-profile'>Xem Profile</button>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <button className='btn-view-profile'>Xem Profile</button>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <button className='btn-view-profile'>Xem Profile</button>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <button className='btn-view-profile'>Xem Profile</button>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <button className='btn-view-profile'>Xem Profile</button>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <button className='btn-view-profile'>Xem Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer backgroundColor={"#6ADBD7"} />
        </>
    );
}
