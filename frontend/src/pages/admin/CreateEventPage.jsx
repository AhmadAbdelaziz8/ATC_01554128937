import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { createEvent } from "../../services/eventService";
import EventForm from "../../components/EventCard/EventForm";

const CreateEventPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createEvent(formData, token);
      navigate("/admin/events");
    } catch (err) {
      setError(err.message || "Failed to create event");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Create New Event</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default CreateEventPage;
