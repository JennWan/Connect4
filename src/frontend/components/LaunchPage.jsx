import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Events } from '../../create-event.js';
import { useState } from 'react';
import './LaunchPage.css'

function LaunchPage() {
    const navigate = useNavigate();
    const [events] = useState(new Events());
    const event = events.getRandom();

    const handleEventClick = () => {
        navigate('/event', { state: event }); // Pass event data to the EventPage
    };

    return (
        <div className="launch-page">
            <div className="event-card" onClick={handleEventClick}>
                <img src={event.imageUrl} className="launch-image" />
                <h2>{event.name}</h2>
                <p>{event.desc}</p>
            </div>
        </div>
    );
}

export default LaunchPage;
