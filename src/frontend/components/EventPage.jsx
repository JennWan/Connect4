import React from 'react';
import { useLocation } from 'react-router-dom';
import { Events } from '../../create-event.js';
import './EventPage.css';

function EventPage() {
  const location = useLocation();
  const event = location.state;
  const eventsManager = new Events();

  const getImageUrl = () => {
    return eventsManager.getValidImageUrl(event?.imageUrl);
  };

  return (
    <div className="event-page">
      {event ? (
        <>
          <img 
            src={getImageUrl()} 
            alt={event.name}
            onError={(e) => {
              e.target.src = eventsManager.defaultImageUrl;
            }}
          />
          <h1>{event.name}</h1>
          <p>{event.desc}</p>
          <p><strong>Created:</strong> {new Date(event.createdAt).toLocaleString()}</p>
          <button className="join-event">Join Event</button>
        </>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
}

export default EventPage;