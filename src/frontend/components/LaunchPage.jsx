import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Events } from '../../create-event.js';
import { useState, useEffect } from 'react';
import './LaunchPage.css';

function LaunchPage() {
    const navigate = useNavigate();
    const [events] = useState(new Events());
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const randomEvent = events.getRandom();
        setEvent(randomEvent);
    }, [events]);

    const handleEventClick = () => {
        if (event) {
            navigate('/event', { state: event });
        }
    };

    if (!event) {
        return (
            <div className="launch-page">
                <div className="no-events">
                    <h2>No events available</h2>
                    <button onClick={() => navigate('/create-event')}>Create an Event</button>
                </div>
            </div>
        );
    }

    return (
        <div className="launch-page">
            <div className="event-card" onClick={handleEventClick}>
                <img 
                    src={event.imageUrl} 
                    alt={event.name}
                    className="launch-image"
                    onError={(e) => {
                        e.target.src = events.defaultImageUrl;
                    }}
                />
                <div className="event-info">
                    <h2>{event.name}</h2>
                    <p>{event.desc}</p>
                </div>
            </div>
        </div>
    );
}

export default LaunchPage;
