import './EventGal.css'
import EventCard from './EventCard';

function EventGal() {
    const events = [
        {id: 1,
            title: "Hackathon 2025",
            date: "April 10, 2025",
            image:""},
    ];

    return (
        <div className="event-gallery">
            <h2>Happening Now</h2>
            <div className="gallery-grid">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        title={event.title}
                        date={event.date}
                        image={event.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default EventGal