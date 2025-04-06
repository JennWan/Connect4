import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Events } from '../../create-event.js';
import './LaunchPage.css';

// Motivational quotes
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    }
];

function LaunchPage() {
    const navigate = useNavigate();
    const [events] = useState(new Events());
    const [event, setEvent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [currentQuote, setCurrentQuote] = useState(quotes[0]);

    useEffect(() => {
        const randomEvent = events.getRandom();
        setEvent(randomEvent);
        if (randomEvent && randomEvent.imageUrl) {
            setBackgroundImage(randomEvent.imageUrl);
        }

        // Update clock
        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        // Update quote
        const updateQuote = () => {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setCurrentQuote(randomQuote);
        };

        // Initial updates
        updateClock();
        updateQuote();

        // Set up intervals
        const clockInterval = setInterval(updateClock, 60000);
        const quoteInterval = setInterval(updateQuote, 3600000);

        // Cleanup
        return () => {
            clearInterval(clockInterval);
            clearInterval(quoteInterval);
        };
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
            <div className="top-content">
                <div className="clock">{currentTime}</div>
                <div className="quote-container">
                    <p className="quote">{currentQuote.text}</p>
                    <p className="quote-author">- {currentQuote.author}</p>
                </div>
            </div>

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
