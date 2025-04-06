import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Events } from '../create-event.js';

function CreateEventTab() {
    const navigate = useNavigate();
    const [events] = useState(new Events());
    const [eventName, setEventName] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventImage, setEventImage] = useState('');

    const handleCreateEvent = async () => {
        if (eventName.trim() && eventDesc.trim()) {
            try {
                const event = await events.createEvent(eventName, eventDesc, eventImage);
                console.log('Created new event:', event);
                navigate('/events');
            } catch (error) {
                console.error('Failed to create event:', error);
            }
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h2>Create New Event</h2>
                <button onClick={() => navigate(-1)}>Back to Events</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        id="eventName"
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Enter event name"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label htmlFor="eventDesc">Event Description:</label>
                    <textarea
                        id="eventDesc"
                        value={eventDesc}
                        onChange={(e) => setEventDesc(e.target.value)}
                        placeholder="Enter event description"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
                    />
                </div>

                <div>
                    <label htmlFor="eventImage">Event Image URL (optional):</label>
                    <input
                        id="eventImage"
                        type="text"
                        value={eventImage}
                        onChange={(e) => setEventImage(e.target.value)}
                        placeholder="Enter image URL"
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <button
                    onClick={handleCreateEvent}
                    style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Create Event
                </button>
            </div>
        </div>
    );
}

export default CreateEventTab;