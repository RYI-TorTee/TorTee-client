import React, { useEffect, useState } from 'react';
import "./MentorMessenger.scss";
import NavMentor from '../../../components/Nav-mentor/NavMentor';
import axiosInstance from '../../../service/AxiosInstance';
import { RYI_URL } from '../../../URL_BE/urlbackend';
import altImg from '../../../assets/image/noImage.png';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

export default function MentorMessenger() {
    const [myChats, setMyChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChatPartnerId, setSelectedChatPartnerId] = useState(null);
    const [chatName, setChatName] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const fetchMyChats = () => {
        axiosInstance.get(`${RYI_URL}/Messages/my-chats`)
            .then((response) => {
                console.log(response)
                setMyChats(response.data.data)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    const fetchMessages = (chatPartnerId) => {
        axiosInstance.get(`${RYI_URL}/Messages/messages?ChatPartnerId=${chatPartnerId}&PageIndex=1&PageSize=1000`)
            .then((response) => {
                console.log(response)
                const sortedMessages = response.data.data.sort((a, b) => new Date(a.sentTime) - new Date(b.sentTime));
                setMessages(sortedMessages);
            })
            .catch((error) => {
                console.log('error mess', error)
            })
    }

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        axiosInstance.post(`${RYI_URL}/Messages/send-messages`, {
            chatPartnerId: selectedChatPartnerId,
            content: newMessage
        })
            .then((response) => {
                fetchMessages(selectedChatPartnerId);
                setNewMessage('');
            })
            .catch((error) => {
                console.log('Error sending message', error);
            });
    };

    useEffect(() => {
        fetchMyChats();
    }, [])

    const handleChatItemClick = (chat) => {
        setSelectedChatPartnerId(chat.chatPartnerId);
        fetchMessages(chat.chatPartnerId);
        setChatName(chat.chatPartnerName);
    };

    return (
        <div>
            <NavMentor activePage="messenger" />
            <div className='mentor-messenger-container'>
                <div className='chat-box'>
                    <div className='chat-bar'>
                        <p className='mess-title'>Tin nhắn</p>
                        <InputGroup className="mb-3">
                            <Form.Control
                                className='input-search-chat'
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <div className='chat-list'>
                            {myChats && myChats.length > 0 && myChats.map((chat) => (
                                <div
                                    className='chat-item'
                                    key={chat.chatPartnerId}
                                    onClick={() => handleChatItemClick(chat)}
                                >
                                    <img className='chat-photo' src={chat.chatPartnerPhoto || altImg} alt="chat partner" />
                                    <div className='partner-infor'>
                                        <div className='partnerName-time'>
                                            <p className='partner-name'><b>{chat.chatPartnerName}</b></p>
                                            <p className='time-chat'></p>
                                        </div>
                                        <p>{chat.messages[0]?.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mentor-mess'>
                        <div className='mentor-name-mess'>
                            <h4>{chatName}</h4>
                        </div>
                        <div className='mess-content'>
                            {selectedChatPartnerId && messages.map((message, index) => (
                                <div className={`message ${message.isSentByCurrentUser ? 'my-mess' : 'partner-mess'}`} key={index}>
                                    <p>
                                        {!message.isSentByCurrentUser && <strong>{message.senderName}</strong>} {message.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className='message-input'>
                            <InputGroup className="mb-3 input-mess-container">
                                <Form.Control
                                    placeholder={`Nhập @ tới ${chatName}`}
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    className='input-mess'
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </Button>
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
