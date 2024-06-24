import * as signalR from '@microsoft/signalr';
import { RYI_URL } from '../URL_BE/urlbackend';
import { useEffect, useState } from 'react';


function App() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${RYI_URL}/notificationhub`)
            .build();

        connection.on("receiveNotification", (message) => {
            setNotifications((prevNotifications) => [...prevNotifications, message]);
        });

        connection.start()
            .catch(err => console.error("Connection failed: ", err));

        return () => {
            connection.stop();
        };
    }, []);
}
