import { useEffect, useState } from "react";
import api from "../api/axios";
import EventsView from "../components/EventsView";
import { useToast } from "../context/ToastContext";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.get("/events/");
        setEvents(result.data.events);
      } catch (error) {
        showToast("error", error.response?.data?.message ?? "Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return <EventsView events={events} loading={loading} setEvents={setEvents} setLoading={setLoading} />;
};

export default EventsPage;
