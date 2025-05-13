import HeroSection from "@/components/HeroSection";
import CategoryLinks from "@/components/CategoryLinks";
import EventCard from "@/components/EventCard/EventCard";
import { useState, useEffect } from "react";
import { getAllEvents } from "../services/eventService";

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-800"></div>
    </div>
  );
}

// Error Message Component
function ErrorMessage({ message }) {
  return <p className="text-center text-red-600">Error: {message}</p>;
}

// Event Grid Component
function EventGrid({ events }) {
  if (!events.length) {
    return (
      <p className="text-center text-slate-600">
        No upcoming events at the moment. Check back soon!
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents();
        setEvents(events);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Only pass the first 4 events to EventGrid
  const firstFourEvents = events.slice(0, 4);

  return (
    <div className="text-3xl font-bold">
      <HeroSection />
      <CategoryLinks />

      {/* Upcoming Events Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10 text-slate-800">
          Upcoming Events
        </h2>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <EventGrid events={firstFourEvents} />
        )}
      </div>
    </div>
  );
}
