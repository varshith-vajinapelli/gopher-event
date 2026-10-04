import { Link } from "react-router-dom";
import EventCard from "./events/EventCard";
import NavBar from "./events/NavBar";

const EventCardSkeleton = () => <div className="event-card-skeleton" aria-hidden="true"><div className="event-card-skeleton-image" /><div className="event-card-skeleton-content"><div className="event-card-skeleton-line event-card-skeleton-title" /><div className="event-card-skeleton-line event-card-skeleton-meta" /><div className="event-card-skeleton-line event-card-skeleton-meta event-card-skeleton-meta-short" /></div></div>;

const EventsView = ({ results, loading, setResults, setLoading }) => {
  const { exactResults, semanticResults, search } = results;
  const total = exactResults.length + semanticResults.length;

  return (
  <div className="min-h-screen bg-cream">
    <NavBar setResults={setResults} setLoading={setLoading} />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
      <div className={search ? "events-search-header" : "mb-8"}>
        {!loading && !search && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">Discover campus life</p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
              {loading ? "Loading events..." : search ? (
                <><span className="events-search-prefix">Results for </span><span className="events-search-term">“{search}”</span></>
              ) : "Upcoming Events"}
            </h1>
            {!loading && !search && (
              <p className="mt-2 text-sm text-ink-soft sm:text-base">Find something worth putting on your calendar.</p>
            )}
          </div>
          {!loading && total > 0 && (
            <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink-soft">
              {total} {search ? "result" : "event"}{total !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" aria-label="Loading events">
          {Array.from({ length: 6 }, (_, index) => <EventCardSkeleton key={index} />)}
        </div>
      )}
      {!loading && exactResults.length > 0 && (
        <section className="mb-10">
          {search && <h2 className="events-result-heading">Exact matches</h2>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {exactResults.map((event) => (
              <Link className="no-underline text-inherit" key={event.publicId} to={`/events/${event.publicId}`}>
                <EventCard title={event.title} venue={event.venue} startsAt={event.startsAt} endsAt={event.endsAt} imageUrl={event.thumbnailUrl} />
              </Link>
            ))}
          </div>
        </section>
      )}
      {!loading && semanticResults.length > 0 && (
        <section className="mb-10">
          <h2 className="events-result-heading">Related events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {semanticResults.map((event) => (
              <Link className="no-underline text-inherit" key={event.publicId} to={`/events/${event.publicId}`}>
                <EventCard title={event.title} venue={event.venue} startsAt={event.startsAt} endsAt={event.endsAt} imageUrl={event.thumbnailUrl} />
              </Link>
            ))}
          </div>
        </section>
      )}
      {!loading && total === 0 && <div className="py-20 text-center"><div className="mx-auto h-16 w-16 bg-line/40 rounded-2xl flex items-center justify-center mb-4"><svg className="h-8 w-8 text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" /></svg></div><h3 className="font-sans text-ink font-semibold">{search ? "No events found" : "No events yet"}</h3><p className="mt-1 text-ink-soft text-sm">{search ? "Try another topic, event name, or location." : "Check back later for upcoming events!"}</p></div>}
    </main>
  </div>
  );
};

export default EventsView;
