import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page" id="top">
      <header>
        <nav>
          <a href="#top" className="logo">
            <span className="logo-pin" aria-hidden="true"></span>
            GopherEvent
          </a>
          <ul className="nav-links">
            <li><a href="#features">What it does</a></li>
            <li><a href="#how">How it works</a></li>
          </ul>
          <div className="nav-cta">
            <Link to="/events" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
              Browse events
            </Link>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="board-stack">
            <div className="notice flutter-in" style={{ "--rot": "-0.6deg", animationDelay: ".05s" }}>
              <span className="eyebrow">Your events, in one place</span>
              <h1>Find your next<br />campus event.</h1>
              <p className="sub">
                Browse upcoming events, search for something you enjoy, and RSVP with your UMN account.
              </p>
              <div className="cta-row">
                <Link to="/events" className="btn btn-primary">Browse events</Link>
                <Link to="/events/create" className="btn btn-ghost">Post an event</Link>
              </div>
            </div>

            <div className="flyer-row">
              <div className="flyer f1 pin-gold flutter-in" style={{ "--rot": "-7deg", animationDelay: ".2s" }}>
                <span className="tag orange">Career</span>
                <h3>Fall Involvement Fair</h3>
                <p className="meta mono">NORTHROP MALL<br />THU · 11:00 AM</p>
                <p className="stub">Example event</p>
              </div>
              <div className="flyer f2 pin-maroon flutter-in" style={{ "--rot": "6deg", animationDelay: ".3s" }}>
                <span className="tag blue">Watch party</span>
                <h3>Hockey vs. Wisconsin</h3>
                <p className="meta mono">COFFMAN UNION<br />FRI · 7:00 PM</p>
                <p className="stub">Example event</p>
              </div>
              <div className="flyer f3 pin-gold flutter-in" style={{ "--rot": "4deg", animationDelay: ".4s" }}>
                <span className="tag green">Free food</span>
                <h3>Late Night Breakfast</h3>
                <p className="meta mono">BAILEY DINING<br />TUE · 10:00 PM</p>
                <p className="stub">Example event</p>
              </div>
              <div className="flyer f4 pin-maroon flutter-in" style={{ "--rot": "-5deg", animationDelay: ".5s" }}>
                <span className="tag orange">Tech</span>
                <h3>Hackathon Kickoff</h3>
                <p className="meta mono">WALTER LIBRARY<br />SAT · 9:00 AM</p>
                <p className="stub">Example event</p>
              </div>
              <div className="flyer f5 pin-gold flutter-in" style={{ "--rot": "9deg", animationDelay: ".6s" }}>
                <span className="tag blue">Panel</span>
                <h3>CS Career Panel</h3>
                <p className="meta mono">KELLER HALL<br />WED · 4:00 PM</p>
                <p className="stub">Example event</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What it does</span>
            <h2>Browse, search, and join in.</h2>
          </div>
          <div className="features-grid">
            <div className="feature reveal">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 3v4M16 3v4" /><circle cx="15.5" cy="15.5" r="2.2" /><path d="M17.1 17.1L19 19" /></svg>
              </div>
              <h3>Discover</h3>
              <p>Browse upcoming events or describe what you're looking for to find exact matches and related events.</p>
            </div>
            <div className="feature reveal">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.3l2.3 2.3 4.7-4.9" /></svg>
              </div>
              <h3>RSVP</h3>
              <p>Log in with your UMN account to register for an upcoming event with available space.</p>
            </div>
            <div className="feature reveal">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M12 13v5M9.5 15.5h5" /></svg>
              </div>
              <h3>Post an event</h3>
              <p>Share your event's details, date, venue, and capacity with the campus community.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how" id="how">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Find an event. Make a plan.</h2>
          </div>
          <div className="steps">
            <div className="step reveal">
              <div className="num mono">01</div>
              <h3>Find something happening</h3>
              <p>Browse the event list or search for a topic, event name, or venue.</p>
              <div className="step-line" aria-hidden="true"></div>
            </div>
            <div className="step reveal">
              <div className="num mono">02</div>
              <h3>Check the details</h3>
              <p>Open an event to see its description, time, location, and available space.</p>
              <div className="step-line" aria-hidden="true"></div>
            </div>
            <div className="step reveal">
              <div className="num mono">03</div>
              <h3>RSVP</h3>
              <p>Sign in to register. New here? Create an account with your @umn.edu email.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band" id="get-started">
        <div className="wrap">
          <h2>See what's happening on campus.</h2>
          <p>Explore upcoming events or share one of your own.</p>
          <div className="cta-row">
            <Link to="/events" className="btn btn-on-maroon">Browse events</Link>
            <Link to="/events/create" className="btn" style={{ border: "2px solid var(--cream)", color: "var(--cream)" }}>
              Post an event
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a href="#top" className="logo">
                <span className="logo-pin" aria-hidden="true"></span>
                GopherEvent
              </a>
              <p className="foot-tag">
                Discover and share campus events.
              </p>
            </div>
            <ul className="foot-links">
              <li><a href="#features">What it does</a></li>
              <li><a href="#how">How it works</a></li>
            </ul>
          </div>
          <div className="foot-bottom">
            <span>gopherevent.com</span>
            <span>© 2026 GopherEvent</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
