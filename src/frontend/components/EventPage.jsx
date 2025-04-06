import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Events } from '../../create-event.js';
import './EventPage.css';

function EventPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const event = location.state;
    const eventsManager = new Events();

    const getImageUrl = () => {
        return eventsManager.getValidImageUrl(event?.imageUrl);
    };

    const handleJoinEvent = async () => {
        alert('Event joined');
        navigate('/events');
    };

    return (
        <div className="event-page">
            {event ? (
                <>
                    <div className = "event-images">
                        <img className="event-img"
                            src={getImageUrl()}
                            alt={event.name}
                            onError={(e) => {
                                e.target.src = eventsManager.defaultImageUrl;
                            }}
                        />
                        <div className = "location-tag">
                            <img className="pin" src="./events/location-pin.png"/>
                            <h3 >{event.location}</h3>
                        </div>
                        
                    </div>
                   
                    <div className="event-details">
                        <h1>{event.name}</h1>
                        <div className="description-join">
                        <p>{event.desc}</p>
                        <button className="join-event" onClick={handleJoinEvent}>Join Event</button>
                        </div>
                    </div>
                    <div className="created">
                    <p><strong>Time:</strong> {event.date}</p>
                    </div>

                </>
            ) : (
                <p>Event not found</p>
            )}
        </div>
    );
}

export default EventPage;