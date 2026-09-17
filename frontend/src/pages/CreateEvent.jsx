import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CreateEventForm from "../components/CreateEventForm";
import { useToast } from "../context/ToastContext";

const CreateEvent = () => {
  const [values, setValues] = useState({ title: "", description: "", venue: "", thumbnailUrl: "", bannerUrl: "", startsAt: "", endsAt: "", capacity: "" });
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  async function handleSubmission(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await api.post("/events", { ...values, bannerUrl: values.bannerUrl || null, capacity: Number(values.capacity), startsAt: new Date(values.startsAt).toISOString(), endsAt: new Date(values.endsAt).toISOString() });
      showToast("success", "Event created!");
      navigate(`/events/${result.data.event.publicId}`);
    } catch (error) {
      showToast("error", error.response?.data?.message ?? "Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  return <CreateEventForm values={values} isLoading={isLoading} onChange={handleChange} onSubmit={handleSubmission} />;
};

export default CreateEvent;
