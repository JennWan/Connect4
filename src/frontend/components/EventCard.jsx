import React from 'react';
import { Events } from '../../create-event.js';
import './EventCard.css'

const eventsManager = new Events();

const EventCard = ({ event }) => {

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
            <div className="desc">
                <h3>{event.name}</h3>
                <p>{event.desc}</p>
            </div>
        
            <div className = "location">
                <img src="./events/location-pin.png" alt="" />
                <p>{event.location}</p>
            </div>

            
            
        </div>
    );
};

export default EventCard;
  