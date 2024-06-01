import React, { useEffect, useState } from 'react';
import "./BrowseMentor.scss";
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import img from "../../../assets/image/banner-img2.jpg"
import Footer from "./../../../components/footer/Footer"
import { Link } from 'react-router-dom';
import { RYI_URL } from '../../../URL_BE/urlbackend'
import axios from 'axios';

export default function BrowseMentor() {


    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        axios.get(`${RYI_URL}/Mentor/browse-mentor`)
            .then(response => {
                setMentors(response);
                console.log(response);
            })
            .catch(error => {
                console.error("There was an error fetching the mentors!", error);
            });
    }, []);


    return (
        <>
            <NavMentee activePage="mentors" />
            <div className='browse-mentor-container'>

                <div className='filter-mentor'>
                    <p className='filter-title'>Filter</p>
                    <div className='filter-container'>
                        <div className='filter-item'>
                            <h4>Job title</h4>
                            <form>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" style={{ height: 'fit-content' }} />
                                    <label for="subscribeNews" style={{ marginLeft: '10px' }}>Subscribe to newsletter?</label>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" style={{ height: 'fit-content' }} />
                                    <label for="subscribeNews" style={{ marginLeft: '10px' }}>Subscribe to newsletter?</label>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" style={{ height: 'fit-content' }} />
                                    <label for="subscribeNews" style={{ marginLeft: '10px' }}>Subscribe to newsletter?</label>
                                </div>
                            </form>

                        </div>
                        <div className='filter-item'>
                            <h4>
                                AverageRating
                            </h4>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" style={{ height: 'fit-content' }} />
                                <label for="subscribeNews" style={{ marginLeft: '10px' }}>Subscribe to newsletter?</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" style={{ height: 'fit-content' }} />
                                <label for="subscribeNews" style={{ marginLeft: '10px' }}>Subscribe to newsletter?</label>
                            </div>
                        </div>
                        <div className='filter-item'>
                            <h4>Company</h4>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" style={{ height: 'fit-content' }} />
                                <label for="subscribeNews" style={{ marginLeft: '10px' }}>Subscribe to newsletter?</label>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" style={{ height: 'fit-content' }} />
                                <label for="subscribeNews" style={{ marginLeft: '10px' }}>Subscribe to newsletter?</label>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='mentors-list-container'>
                    <h1 className='mentor-community-title'>MENTOR COMMUNITY</h1>
                    <div className='mentors-list'>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <Link to='/mentee/mentor-profile' className='btn-view-profile'>Xem Profile</Link>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <Link className='btn-view-profile'>Xem Profile</Link>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <Link className='btn-view-profile'>Xem Profile</Link>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <Link className='btn-view-profile'>Xem Profile</Link>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <Link className='btn-view-profile'>Xem Profile</Link>
                        </div>
                        <div className='mentor-item'>
                            <img src={img} className='img-mentor-profile' alt='img-mentor-profile' />
                            <p style={{ fontWeight: "700" }}>Nguyễn Văn A</p>
                            <p>Software developer</p>
                            <span>Tôi là.....</span>
                            <Link className='btn-view-profile'>Xem Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer backgroundColor={"#6ADBD7"} />
        </>
    );
}
