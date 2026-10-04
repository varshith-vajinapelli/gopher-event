import { useEffect, useState } from "react";
import api from "../api/axios";
import EventsView from "../components/EventsView";
import { useToast } from "../context/ToastContext";

const EventsPage = () => {
  const [results, setResults] = useState({ exactResults: [], semanticResults: [], search: "" });
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.get("/events/");
        setResults({ exactResults: result.data.exactResults, semanticResults: result.data.semanticResults, search: "" });
      } catch (error) {
        showToast("error", error.response?.data?.message ?? "Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return <EventsView results={results} loading={loading} setResults={setResults} setLoading={setLoading} />;
};

export default EventsPage;
