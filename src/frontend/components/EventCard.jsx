import React from 'react';
import { Events } from '../../create-event.js';
import './EventCard.css'

const eventsManager = new Events();

const EventCard = ({ event }) => {
    const handleDelete = async () => {
        await eventsManager.deleteEvent(event.id);
        window.location.reload();
    };

    const getImageUrl = () => {
        return eventsManager.getValidImageUrl(event.imageUrl);
    };

    return (
        <div className="event-card">
            <img 
                src={getImageUrl()} 
                alt={event.name} 
                onError={(e) => {
                    e.target.src = eventsManager.defaultImageUrl;
                }}
            />
            <h3>{event.name}</h3>
            <p>{event.desc}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default EventCard;
  