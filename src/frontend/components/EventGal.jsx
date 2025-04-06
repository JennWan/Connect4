import './EventGal.css'
import EventCard from './EventCard';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EventGal() {
    const navigate = useNavigate();

    const events = [
        {
            id: 1,
            title: "Hackathon 2025",
            date: "April 10, 2025",
            image: ""
        },
    ];

    const handleEventClick = (event) => {
        navigate('/event', { state: event });
    };

    return (
        <div className="event-gallery">
            <h2>Happening Now</h2>
            <button className="add-event">Add Event</button>
            <div className="gallery-grid">
                {events.map((event) => (
                    // Trigger handleEventClick function when event card is clicked
                    <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}  // On click, call the handler
                    >
                        <EventCard
                            title={event.title}
                            date={event.date}
                            image={event.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventGal