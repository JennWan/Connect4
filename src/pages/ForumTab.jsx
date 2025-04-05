import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Forum }from '../forum.js';

function ForumTab() {
  const { programId } = useParams();
  const [forum] = useState(new Forum());
  const [newTopicTitle, setNewTopicTitle] = useState('');

  const createDiscussion = async () => {
    if (newTopicTitle.trim()) {
      try {
        const conversation = await forum.createConversation(newTopicTitle);
        console.log('Created new conversation:', conversation);
        setNewTopicTitle('');
        // Refresh the topics list or update state
      } catch (error) {
        console.error('Failed to create conversation:', error);
      }
    }
  };

  const getForumData = () => {
    switch (programId) {
      case 'arcteryx':
        return {
          title: "Arc'teryx Community Grant Program Forum",
          topics: [
            {
              id: 1,
              title: "Welcome to Arc'teryx Community Grant Program",
            }
          ]
        };
      case 'strategic-partnerships':
        return {
          title: "Strategic Partnerships Program Forum",
          topics: [
            {
              id: 1,
              title: "Welcome to Strategic Partnerships Program",
            }
          ]
        };
      case 'participatory-grantmaking':
        return {
          title: "Participatory Grantmaking Program Forum",
          topics: [
            {
              id: 1,
              title: "Welcome to Participatory Grantmaking Program",
            }
          ]
        };
      default:
        return {
          title: "Forum Not Found",
          topics: []
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
        {forumData.topics.map((topic) => (
          <div key={topic.id} className="forum-topic">
            <div className="topic-main">
              <h3 className="topic-title">{topic.title}</h3>
              <p className="topic-author">by {topic.author}</p>
            </div>
            <div className="topic-details">
              <span className="topic-date">{topic.date}</span>
              <span className="topic-replies">{topic.replies} replies</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumTab; 