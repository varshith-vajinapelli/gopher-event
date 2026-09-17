import EventHero from "./eventDetail/EventHero";
import EventDescription from "./eventDetail/EventDesciption";
import WhenWhere from "./eventDetail/WhenWhere";
import EventCreator from "./eventDetail/EventCreator";
import EventActions from "./eventDetail/EventActions";
import { Link } from "react-router-dom";

const EventDetailView = ({ details, publicId }) => (
  <div className="min-h-screen bg-cream">
    <nav className="event-detail-nav" aria-label="Event navigation">
      <div className="event-detail-nav-inner">
        <Link to="/events" className="event-detail-back-link">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" /></svg>
          Back to events
        </Link>
      </div>
    </nav>
    <EventHero title={details.title} bannerUrl={details.bannerUrl} />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 event-detail-content">
          <EventDescription description={details.description} />
          <div className="event-detail-divider" />
          <WhenWhere startsAt={details.startsAt} endsAt={details.endsAt} venue={details.venue} />
          <div className="event-detail-divider" />
          <EventCreator firstName={details.creator.firstName} lastName={details.creator.lastName} />
        </div>
        <div className="lg:col-span-1"><div className="sticky top-8">
          <EventActions publicId={publicId} totalRSVPs={details.totalRSVPs} capacity={details.capacity} />
        </div></div>
      </div>
    </div>
  </div>
);

export default EventDetailView;
