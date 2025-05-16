import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getEventById, updateEvent } from "../../services/eventService";
import EventForm from "../../components/EventCard/EventForm";

const EditEventPage = () => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load event");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await updateEvent(id, formData, token);
      navigate("/admin/events");
    } catch (err) {
      setError(err.message || "Failed to update event");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-8 dark:text-white">Loading event...</div>
    );
  }

  if (error && !event) {
    return (
      <div className="text-center p-8 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Edit Event</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      <EventForm
        event={event}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditEventPage;
