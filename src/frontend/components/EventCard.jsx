import './EventCard.css'

function EventCard({ title, date, image }) {
    return (
      <div className="event-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{date}</p>
        <button className="join-event">Join Event</button>
      </div>
    );
  }
  
  export default EventCard;
  