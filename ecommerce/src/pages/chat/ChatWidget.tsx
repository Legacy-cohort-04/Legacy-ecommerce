import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styles from './ChatWidget.module.css';

const SOCKET_SERVER_URL = 'http://localhost:3002'; // Ajustez selon votre configuration

const ChatWidget: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData.firstName) {
      setName("User" + Math.floor(Math.random() * 1000));
    } else {
      setName(userData.firstName);
    }

    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('chat message', (msg: string) => {
      console.log('Received message:', msg);
      setMessages(prev => [...prev, msg]);
    });

    newSocket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input && name && socket) {
      const message = `${name}: ${input}`;
      console.log('Sending message:', message);
      socket.emit('chat message', message);
      setInput('');
    } else {
      console.log('Cannot send message:', { input, name, socketConnected: !!socket });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatWidgetContainer}>
      <div className="card" id="chat2">
        <div className="card-header d-flex justify-content-between align-items-center p-3">
          <h5 className="mb-0">Chat</h5>
          <button onClick={() => setIsOpen(false)} className="btn btn-primary btn-sm">
            Close
          </button>
        </div>

        <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
          <div className={styles.messages}>
            {messages.map((msg, index) => {
              const isOwnMessage = msg.startsWith(name);
              return (
                <div key={index} className={`d-flex ${isOwnMessage ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
                  {!isOwnMessage && (
                    <img src="/default-avatar.png" alt="avatar" style={{ width: '45px', height: '45px' }} className="rounded-circle me-2" />
                  )}
                  <div>
                    <p className={`small p-2 ${isOwnMessage ? 'me-3 text-white bg-primary rounded-3' : 'ms-3 bg-light rounded-3'}`}>
                      {msg}
                    </p>
                  </div>
                  {isOwnMessage && (
                    <img src="/default-avatar.png" alt="avatar" style={{ width: '45px', height: '45px' }} className="rounded-circle ms-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
          <form onSubmit={handleSubmit} className="d-flex w-100">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Type message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary ms-2">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget; 