import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      const errorMessage = error.response?.status === 401
        ? "Please log in to create an event."
        : error.response?.data?.message ?? "Failed to create event";
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (!localStorage.getItem("token")) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl">Please log in to create an event.</h1>
          <Link to="/login" className="inline-block mt-6 rounded bg-maroon px-6 py-3 text-white">Log in</Link>
        </div>
      </main>
    );
  }

  return <CreateEventForm values={values} isLoading={isLoading} onChange={handleChange} onSubmit={handleSubmission} />;
};

export default CreateEvent;
