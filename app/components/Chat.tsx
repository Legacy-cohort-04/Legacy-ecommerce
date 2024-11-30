import React, { useEffect } from 'react';
import socket from '../utils/socket';

const Chat: React.FC = () => {
    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', 'Hello from client!');
    };

    return (
        <div>
            <h1>Chat Component</h1>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default Chat; 