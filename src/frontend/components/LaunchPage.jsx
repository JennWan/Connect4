import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Events } from '../../create-event.js';
import './LaunchPage.css';

function LaunchPage() {
    const navigate = useNavigate();
    const [events] = useState(new Events());
    const [event, setEvent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(null);

    useEffect(() => {
        const randomEvent = events.getRandom();
        setEvent(randomEvent);
        if (randomEvent && randomEvent.imageUrl) {
            setBackgroundImage(randomEvent.imageUrl);
        }
    }, [events]);

    const handleEventClick = () => {
        if (event) {
            navigate('/event', { state: event });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
        }
    };

    return (
        <div 
            className="launch-page"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
            }}
        >
            <form id="search-form" onSubmit={handleSearch}>
                <input
                    id="search-box"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                />
            </form>

            {event && (
                <div id="overlay" onClick={handleEventClick}>
                    <h1 id="event-name">{event.name}</h1>
                    <p id="event-date">{event.date}</p>
                    <p id="event-desc">{event.desc}</p>
                </div>
            )}
        </div>
    );
}

export default LaunchPage;
