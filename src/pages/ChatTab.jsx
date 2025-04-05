import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Forum } from '../forum.js';

function ChatTab() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const [forum] = useState(new Forum());
    const [topic, setTopic] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        loadTopicAndMessages();
    }, [topicId]);

    const loadTopicAndMessages = async () => {
        try {
            const conversations = await forum.listConversation();
            const currentTopic = conversations.find(c => c.id === parseInt(topicId));
            if (currentTopic) {
                setTopic(currentTopic);
                setMessages(currentTopic.messages);
            }
        } catch (error) {
            console.error('Failed to load topic:', error);
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim() && author.trim()) {
            try {
                await forum.addMessage(parseInt(topicId), newMessage, author);
                setNewMessage('');
                await loadTopicAndMessages();
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    if (!topic) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>{topic.title}</h2>
                <button onClick={() => navigate(-1)}>Back to Forum</button>
            </div>
            
            <div style={{ height: '60vh', overflowY: 'auto', border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                {messages.map((message) => (
                    <div key={message.id} style={{ marginBottom: '15px', padding: '10px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9em', color: '#666' }}>
                            <span>{message.author}</span>
                            <span>{new Date(message.createdAt).toLocaleString()}</span>
                        </div>
                        <div style={{ wordWrap: 'break-word' }}>{message.text}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                    style={{ width: '150px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button 
                    onClick={sendMessage}
                    style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatTab;
