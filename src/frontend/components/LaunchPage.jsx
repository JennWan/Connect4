import './LaunchPage.css'

function LaunchPage({title, group, details}) {

  return (
    <>
      <div className="image">
      <img src="" alt="" />
      <div className="event-info">
        <h2>Event Info</h2>
        <div className="info">
            <h3>{title}</h3>
            <h4>{group}</h4>
            <h5>Details: {details}</h5>
        </div>
      </div>
      </div>
    </>
  )
}

export default LaunchPage