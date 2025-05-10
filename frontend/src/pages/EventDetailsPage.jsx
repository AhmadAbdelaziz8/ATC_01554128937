import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { mockEvents } from "../assets/mock/events-data";
import {
  CalendarDays,
  MapPin,
  Tag,
  Info,
  Ticket,
  DollarSign,
} from "lucide-react";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const foundEvent = mockEvents.find((e) => e.id === eventId);

    setTimeout(() => {
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        console.error("Event not found!");
      }
      setIsLoading(false);
    }, 500);
  }, [eventId]);

  const handleBookNow = () => {
    console.log(`Booking event: ${event.name} (ID: ${event.id})`);

    const eventIndex = mockEvents.findIndex((e) => e.id === eventId);
    if (eventIndex !== -1) {
      mockEvents[eventIndex].isBooked = true;
    }

    navigate(`/booking-confirmation/${event.id}`); // Navigate to a confirmation page
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-slate-600">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          Event Not Found
        </h1>
        <p className="text-slate-600">
          The event you are looking for does not exist or may have been removed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Event Image */}
        <img
          src={
            event.imageUrl ||
            "https://via.placeholder.com/800x400?text=Event+Image"
          }
          alt={event.name}
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
        />

        <div className="p-6 md:p-8">
          {/* Event Name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            {event.name}
          </h1>

          {/* Event info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-slate-700">
            <div className="flex items-start">
              <Tag className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Category:</span>{" "}
                {event.category}
              </div>
            </div>
            <div className="flex items-start">
              <CalendarDays className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Date & Time:</span>{" "}
                {formatDate(event.date)}
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Venue:</span> {event.venue}
              </div>
            </div>
            <div className="flex items-start">
              <DollarSign className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
              <div>
                <span className="font-semibold">Price:</span>
                {event.price > 0 ? ` $${event.price.toFixed(2)}` : " Free"}
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-700 mb-3 flex items-center">
              <Info className="w-6 h-6 mr-2 text-orange-500" />
              About this Event
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Booking Button */}

          {event.isBooked ? (
            <div className="text-center">
              <span className="bg-green-100 text-green-700 font-semibold py-3 px-8 rounded-lg text-lg inline-block">
                You have already booked this event.
              </span>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleBookNow}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              >
                <Ticket className="w-5 h-5 mr-2 inline-block" />
                Book Now (1 Ticket)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
