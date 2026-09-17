import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import EventDetailLoader from "../components/eventDetail/EventDetailLoader";
import EventDetailView from "../components/EventDetailView";

const EventDetailPage = () => {
  const { publicId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const result = await api.get(`/events/${publicId}`);
        setDetails(result.data.event);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [publicId]);

  if (error) return <div>Something went wrong</div>;
  if (loading) return <EventDetailLoader />;
  return <EventDetailView details={details} publicId={publicId} />;
};

export default EventDetailPage;
