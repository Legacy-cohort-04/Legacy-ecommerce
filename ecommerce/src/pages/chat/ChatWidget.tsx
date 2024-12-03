import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './ChatWidget.module.css';


interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  sent: boolean;
  id: string;
  username: string;
}

const ChatWidget: React.FC <ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [user, setUser] = useState<{ firstName: string } | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('chat message', (data: { msg: string; username: string }) => {
      setMessages(msg => {
        if (!msg.some(m => m.text === data.msg)) {
          return [...msg, {
            text: data.msg,
            sent: false,
            id: Date.now().toString(),
            username: data.username
          }];
        }
        return msg;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && socket) {
      socket.emit('chat message', { msg: inputMessage, username: user?.firstName || '' });
      
      setMessages(msg => [...msg, {
        text: inputMessage,
        sent: true,
        id: Date.now().toString(),
        username: user?.firstName || ''
      }]);
      setInputMessage('');
    }
  };

  return (
    <div className={`${styles.chatWidget} ${isOpen ? styles.chatWidgetOpen : ''}`}>
      <div className={styles.chatHeader}>
        <h3>Chat Support</h3>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
      </div>
      
      <div className={styles.messageContainer}>
        {messages.map((message) => (
          <div key={message.id} className={styles.messageWrapper}>
            <span className={styles.username}>
              {message.sent ? user?.firstName : message.username}
            </span>
            <div className={`${styles.message} ${message.sent ? styles.sent : styles.received}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className={styles.inputContainer}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Tapez votre message..."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;