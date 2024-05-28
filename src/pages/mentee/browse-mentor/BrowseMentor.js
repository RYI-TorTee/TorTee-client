import React from 'react';
import Select from 'react-select';
import "./BrowseMentor.scss";
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import img from "../../../assets/image/banner-img2.jpg"

const options = [
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'art', label: 'Art' },
    // Add more options as needed
];

export default function BrowseMentor() {
    return (
        <>
            <NavMentee activePage="mentors" />
            <div className='browse-mentor-container'>
                <h1 className='mentor-community-title'>MENTOR COMMUNITY</h1>
                <div className='mentor-community'>
                    <div className='search-mentor'>
                        <Select
                            options={options}
                            placeholder="Chọn chủ đề"
                            className="mentor-select"
                        />
                    </div>
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
        </>
    );
}
