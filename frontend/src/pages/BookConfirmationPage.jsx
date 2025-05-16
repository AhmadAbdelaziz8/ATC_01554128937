import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { getEventById } from "../services/eventService";
import { useAuth } from "../contexts/AuthContext";

export default function BookConfirmationPage() {
  const { eventId } = useParams();
  const { token } = useAuth();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(eventId, token);
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    fetchEvent();
  }, [eventId, token]);

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="bg-white dark:bg-gray-800/90 shadow-xl rounded-lg overflow-hidden text-center p-8">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-slate-800 dark:text-white mb-4">
          Booking Confirmed!
        </h2>

        {event && (
          <p className="text-xl text-slate-600 dark:text-gray-300 mb-8">
            You have successfully booked tickets for{" "}
            <span className="font-medium">{event.name}</span>
          </p>
        )}

        <Link
          to="/"
          className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-md transition duration-300"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
