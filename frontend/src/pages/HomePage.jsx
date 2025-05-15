import HeroSection from "@/components/HeroSection";
import CategoryLinks from "@/components/CategoryLinks";
import EventCard from "@/components/EventCard/EventCard";
import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { getAllEvents } from "../services/eventService";
import { useAuth } from "../AuthContext";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 dark:border-gray-200"></div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="text-center text-red-600 dark:text-red-400">
      Error: {message}
    </p>
  );
}

function EventGrid({ events }) {
  if (!events.length) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No upcoming events at the moment
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
  const { token, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get("location");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await getAllEvents(isAuthenticated ? token : null);
        setEvents(data.events.slice(0, 4));
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token, isAuthenticated]);

  if (locationParam) {
    return (
      <Navigate
        to={`/search?location=${encodeURIComponent(locationParam)}`}
        replace
      />
    );
  }

  return (
    <div>
      <HeroSection />
      <CategoryLinks />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10 text-foreground dark:text-dark-text">
          Upcoming Events
        </h2>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <EventGrid events={events} />
        )}
      </div>
    </div>
  );
}
