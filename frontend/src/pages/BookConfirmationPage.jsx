import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { mockEvents } from "../assets/mock/events-data";

export default function BookConfirmationPage() {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState(null);

  useEffect(() => {
    const event = mockEvents.find((e) => e.id === eventId);
    if (event) {
      setEventName(event.name);
    }
  }, [eventId]);

  return (
    <div className="container mx-auto max-w-4xl py-6 px-4">
      {/* Booking Confirmation Card */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mt-6" />
        <h2 className="text-2xl font-semibold text-center text-slate-800 mt-4">
          Congratulations, Booking Confirmed!
        </h2>
        <p className="text-center text-slate-600 mt-2">
          you have successfully booked your tickets for
        </p>
        {eventName && (
          <p className="text-center text-slate-600 my-4">
            <span className="font-semibold">{eventName}</span>
          </p>
        )}
      </div>

      {/* Link to Homepage */}
      <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4 mt-5">
        <Link
          to="/"
          className="w-full sm:w-auto block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
