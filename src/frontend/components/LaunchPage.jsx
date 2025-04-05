import './LaunchPage.css';

function LaunchPage({ title, group, details }) {
  return (
    <div className="launch-page">
      <img
        src="https://via.placeholder.com/1200x600"
        alt={title}
        className="launch-image"
      />

      <div className="event-info-panel">
        <h2>{title}</h2>
        <p><strong>Group:</strong> {group}</p>
        <p><strong>Details:</strong> {details}</p>
      </div>
    </div>
  );
}

export default LaunchPage;
