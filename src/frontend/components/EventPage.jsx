import React from 'react';
import { useLocation } from 'react-router-dom';

function EventPage() {
  const location = useLocation();
  const event = location.state; // Retrieve the event data passed from LaunchPage

  return (
    <div className="event-page">

      {event ? (
        <>
          <h1>{event.title}</h1>
          <p><strong>Group:</strong> {event.group}</p>
          <p><strong>Details:</strong> {event.details}</p>
          <button className="join-event">Join Event</button>
        </>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
}

export default EventPage;