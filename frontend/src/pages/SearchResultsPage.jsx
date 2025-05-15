import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getAllEvents } from "../services/eventService";
import { useAuth } from "../AuthContext";
import EventCard from "@/components/EventCard/EventCard";

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
      <div className="text-center py-10">
        <p className="text-lg text-slate-600">
          No events found matching your search criteria.
        </p>
        <p className="text-md text-slate-500 mt-2">
          Try a different location or browse all events.
        </p>
        <Link
          to="/search"
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          View All Events
        </Link>
      </div>
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

export default function SearchResultsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get("location");

  // Fetch events whenever location parameter or auth status changes
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Pass token if user is authenticated to get booking status
        // Also pass the location parameter for filtering
        const events = await getAllEvents(
          isAuthenticated ? token : null,
          locationParam
        );
        setEvents(events);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token, isAuthenticated, locationParam]);

  // Create a title that includes location if specified
  const pageTitle = locationParam ? `Events in ${locationParam}` : "All Events";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{pageTitle}</h1>
        {locationParam && (
          <p className="text-slate-600">
            Showing events in{" "}
            <span className="font-semibold">{locationParam}</span>
          </p>
        )}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <EventGrid events={events} />
      )}
    </div>
  );
}
