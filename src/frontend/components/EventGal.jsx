import './EventGal.css'
import EventCard from './EventCard';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Events } from '../../create-event.js';

function EventGal() {
    const navigate = useNavigate();
    const [events] = useState(new Events());
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const eventsList = await events.listEvents();
            setEventList(eventsList);
        } catch (error) {
            console.error('Failed to load events:', error);
        }
    };

    const handleEventClick = (event) => {
        navigate('/event', { state: event });
    };

    return (
        <div className="event-gallery">
            <div className="event-head">
                <h2>EVENTS</h2>
                <button className="upcoming-filter">Upcoming</button>
            </div>
            <button
                className="add-event"
                onClick={() => navigate('/create-event')}
                >
                Add Event
            </button>

            <div className="gallery-grid">
                {eventList.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                    >
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventGal