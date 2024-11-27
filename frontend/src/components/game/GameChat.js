// src/components/game/GameChat.js

import React, {useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import Draggable from "react-draggable";

function GameChat({sessionId}) {
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef([]);
    const [newMessage, setNewMessage] = useState('');
    const stompClientRef = useRef(null);
    const isConnectedRef = useRef(false);

    useEffect(() => {
        console.log('GameChat useEffect called');

        if (isConnectedRef.current) {
            console.log('Already connected or connecting, skipping connection.');
            return;
        }

        const token = localStorage.getItem('token');

        if (token && sessionId) {
            isConnectedRef.current = true; // Set flag immediately

            const socket = new SockJS(`http://localhost:8080/ws?access_token=${token}&sessionId=${sessionId}`);
            const client = over(socket);

            client.connect({}, (frame) => {
                console.log('Connected: ' + frame);
                stompClientRef.current = client;

                // Subscribe to the topic for this session
                client.subscribe(`/topic/messages/${sessionId}`, (message) => {
                    if (message.body) {
                        const messageObj = JSON.parse(message.body);
                        setMessages((prevMessages) => {
                            const updatedMessages = [...prevMessages, messageObj];
                            messagesRef.current = updatedMessages;
                            return updatedMessages;
                        });
                    }
                });
            }, (error) => {
                console.error('STOMP error', error);
                isConnectedRef.current = false; // Reset on error
            });
        }

        return () => {
            console.log('GameChat cleanup function called');
            if (stompClientRef.current !== null) {
                stompClientRef.current.disconnect(() => {
                    console.log('Disconnected');
                });
                isConnectedRef.current = false;
            }
        };
    }, [sessionId]); // Add sessionId to dependency array

    const sendMessage = () => {
        if (stompClientRef.current && newMessage.trim() !== '') {
            const message = {
                content: newMessage,
            };
            stompClientRef.current.send(`/app/chat/${sessionId}`, {}, JSON.stringify(message));
            setNewMessage('');
        }
    };

    return (<Draggable>
            <div className="game-chat">
                <div className="messages">
                    {messages.map((msg, index) => (<div key={index}>
                            <b>{msg.sender}:</b> {msg.content}
                        </div>))}
                </div>
                <div className="input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </Draggable>);
}

export default GameChat;
