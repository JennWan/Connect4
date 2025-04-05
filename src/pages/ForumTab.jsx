import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Forum }from '../forum.js';

function ForumTab() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [forum] = useState(new Forum());
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const conversations = await forum.listConversation();
      setTopics(conversations);
    } catch (error) {
      console.error('Failed to load topics:', error);
    }
  };

  const createDiscussion = async () => {
    if (newTopicTitle.trim()) {
      try {
        const conversation = await forum.createConversation(newTopicTitle);
        console.log('Created new conversation:', conversation);
        setNewTopicTitle('');
        await loadTopics(); // Refresh the topics list
      } catch (error) {
        console.error('Failed to create conversation:', error);
      }
    }
  };

  const handleTopicClick = (topicId) => {
    navigate(`/chat/${topicId}`);
  };

  const getForumData = () => {
    switch (programId) {
      case 'arcteryx':
        return {
          title: "Arc'teryx Community Grant Program Forum",
        };
      case 'strategic-partnerships':
        return {
          title: "Strategic Partnerships Program Forum",
        };
      case 'participatory-grantmaking':
        return {
          title: "Participatory Grantmaking Program Forum",
        };
      default:
        return {
          title: "Forum Not Found",
        };
    }
  };

  const forumData = getForumData(); 

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h2>{forumData.title}</h2>
        <div className="new-topic-container">
          <input
            type="text"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            placeholder="Enter topic title"
            className="new-topic-input"
          />
          <button className="new-topic-btn" onClick={createDiscussion}>
            Create Topic
          </button>
        </div>
      </div>
      
      <div className="forum-list">
        {topics.map((topic) => (
          <div key={topic.id} className="forum-topic">
            <button 
              className="topic-title" 
              onClick={() => handleTopicClick(topic.id)}
            >
              {topic.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumTab; 