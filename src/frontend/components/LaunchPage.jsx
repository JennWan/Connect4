import React from 'react';
import { useNavigate } from 'react-router-dom';

function LaunchPage() {
    const navigate = useNavigate();

    // Example event data 
    const event = {
        id: 1,
        title: "Sample Event",
        group: "Sample Group",
        details: "This is a detailed description of the event."
    };

    const handleEventClick = () => {
        navigate('/event', { state: event }); // Pass event data to the EventPage
    };

    return (
        <div className="launch-page">
            <div className="event-card" onClick={handleEventClick}>
                <img src="event-image.jpg" className="launch-image" />
                <h2>{event.title}</h2>
                <p>{event.group}</p>
            </div>
        </div>
    );
}

export default LaunchPage;
