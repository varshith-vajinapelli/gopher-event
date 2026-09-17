import "./EventPass.css";

/** Purely presentational event-pass visual. */
const EventPass = ({
  title = "Open Source Contribution Sprint",
  date = "Sunday, October 25",
  entryTime = "6:00 AM",
  venue = "McNamara Alumni Center",
  bannerUrl,
  ticketCode = "GE · 7K4P · 208",
  status = "Confirmed",
}) => (
  <article className="event-pass" aria-label={`${title} event pass`}>
    <div
      className="event-pass-photo"
      style={bannerUrl ? { backgroundImage: `url(${bannerUrl})` } : undefined}
    >
      <div className="event-pass-photo-overlay" />
      <div className="event-pass-photo-content">
        <span>GOPHER EVENT</span>
        <p><b>✓</b> RSVP CONFIRMED</p>
      </div>
    </div>

    <div className="event-pass-details">
      <p className="event-pass-kicker">EVENT PASS</p>
      <h2>{title}</h2>
      <div className="event-pass-route" aria-hidden="true"><i /><span /><i /></div>
      <div className="event-pass-info">
        <div><span>DATE</span><strong>{date}</strong></div>
        <div><span>ENTRY</span><strong>{entryTime}</strong></div>
        <div><span>STATUS</span><strong>{status}</strong></div>
      </div>
      <p className="event-pass-venue">{venue}</p>
    </div>

    <div className="event-pass-stub">
      <div className="event-pass-qr">
        {/* TODO (logic): replace this placeholder with a server-issued QR code after RSVP succeeds. */}
        <div className="event-pass-qr-art" aria-label="QR code placeholder">DEMO</div>
      </div>
      <div className="event-pass-stub-copy">
        <span>CHECK-IN PASS</span>
        <strong>{ticketCode}</strong>
        <small>Scan on arrival</small>
      </div>
    </div>
  </article>
);

export default EventPass;
